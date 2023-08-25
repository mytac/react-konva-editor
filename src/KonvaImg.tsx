import React,{ FC, useEffect } from 'react';
import { noop } from 'lodash';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { AdaptStrategy } from './utils';
import { IimageInfo } from './type';

const KonvaImage: FC<IimageInfo> = ({
  stageRef,
  myRef,
  setShowTransformer,
  handleSelected,
  handleInfo,
  onRef,
  value,
  banDrag,
  trRef,
  crop,
  isNew,
  isSelected,
  _isAdaptStage,
  _isProportionalScaling,
  _isChangedCrop,
  ...props
}) => {
  const [image /* status */] = useImage(value, 'anonymous');

  useEffect(() => {
    if (image && (isNew || _isChangedCrop) && _isAdaptStage && stageRef) {
      // 先适配舞台
      // 如果有crop x、y保持原图比例，crop的width和height为适配后的
      const item = AdaptStrategy.adaptNewImage(
        _isChangedCrop ? crop : image,
        stageRef.current,
      );
      if (item) {
        const { width, height } = item;
        if (_isChangedCrop && width && height) {
          // @ts-ignore
          // item.crop = { ...cropXY, width, height };
          item.crop = { ...crop };
        }
        handleInfo({
          ...item,
          width: Number(width),
          height: Number(height),
          scaleX: 1,
          scaleY: 1,
          _isChangedCrop: false,
          _isAdaptStage: false,
          _isProportionalScaling: false,
        });
        trRef.current.nodes([myRef.current]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, _isAdaptStage, image, stageRef, trRef, myRef]);

  useEffect(() => {
    if (onRef) {
      onRef(myRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRef]);

  useEffect(() => {
    const prevLayer = trRef?.current;
    const { height, width, scaleX = 1, scaleY = 1 } = props;
    const prevW = prevLayer.getWidth();
    const prevH = prevLayer.getHeight();

    let oldSize;
    if (width && height) {
      // console.log('use 2', width, height);
      oldSize = {
        width: width * scaleX,
        height: height * scaleY,
      };
    } else if (!isNaN(prevW)) {
      // console.log('use 1', prevW, prevH);

      oldSize = {
        width: prevW,
        height: prevH,
      };
    } else return;
    // console.log('oldSize', oldSize);

    // 直接替换，等比缩放
    if (isSelected && _isProportionalScaling && oldSize) {
      /// adapt image-replacement
      const _isP = // 是否等比缩放
        myRef?.current?.attrs?._isProportionalScaling || _isProportionalScaling;

      if (_isP && image && oldSize) {
        // 替换模式
        const item = AdaptStrategy.adaptReplaceImage(image, oldSize);
        if (item) {
          handleInfo({
            ...item,
            scaleX: 1,
            scaleY: 1,
            _isProportionalScaling: 0,
          });
        }
      }
      trRef.current.nodes([myRef.current]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    image,
    myRef,
    isNew,
    trRef.current,
    isSelected,
    _isProportionalScaling,
    props.width,
    props.height,
  ]);

  useEffect(() => {
    if (trRef && trRef.current) {
      trRef.current.nodes([myRef.current]);
    }
  }, [image, trRef, myRef]);

  const commonParams: any = {};
  if (crop) {
    commonParams.crop = crop;
  }

  return (
    <Image
      image={image}
      ref={myRef}
      onClick={banDrag ? noop : handleSelected}
      // @ts-ignore
      id={String(props.id)}
      {...commonParams}
      {...props}
    />
  );
};

export default KonvaImage;
