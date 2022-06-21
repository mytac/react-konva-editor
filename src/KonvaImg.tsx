import { FC, useEffect, useState } from 'react';
import { noop } from 'lodash';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { AdaptStrategy } from './utils';
import { IimageInfo } from './type';
import usePrevious from './hooks/usePrevious';

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
  isNew,
  isSelected,
  _isAdaptStage,
  _isProportionalScaling,
  ...props
}) => {
  const [oldSize, setOldSize] = useState<null | {
    width: number;
    height: number;
  }>(null);
  const [image /* status */] = useImage(value, 'anonymous');
  const prevMarkerRef: any = usePrevious(myRef); // 上一个激活的值

  useEffect(() => {
    if (onRef) {
      onRef(myRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRef]);

  useEffect(() => {
    // 直接替换，等比缩放
    if (isSelected && (_isProportionalScaling || !isNew)) {
      /// adapt image-replacement
      const _isP = // 是否等比缩放
        myRef?.current?.attrs?._isProportionalScaling || _isProportionalScaling;
      if (_isP && image && oldSize) {
        // 替换模式
        const item = AdaptStrategy.adaptReplaceImage(image, oldSize);
        if (item) {
          handleInfo({ ...item, scaleX: 1, scaleY: 1 });
        }
      }
      trRef.current.nodes([myRef.current]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, myRef, isNew, trRef.current, isSelected, _isProportionalScaling]);

  useEffect(() => {
    if (isSelected) {
      if (prevMarkerRef && prevMarkerRef.current) {
        const prevLayer = prevMarkerRef.current;
        const width = prevLayer.getWidth();
        const height = prevLayer.getHeight();
        const scaleX = prevLayer.attrs.scaleX;
        const scaleY = prevLayer.attrs.scaleY;
        setOldSize({ width: width * scaleX, height: scaleY * height });
      }
    } else {
      setOldSize(null);
    }
  }, [isSelected, prevMarkerRef]);

  useEffect(() => {
    if (image && stageRef && stageRef.current && isNew && _isAdaptStage) {
      // 适配新元素与舞台
      const item = AdaptStrategy.adaptNewImage(image, stageRef.current);
      if (item) {
        handleInfo({
          ...item,
          scaleX: 1,
          scaleY: 1,
        });
        trRef.current.nodes([myRef.current]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, stageRef, isNew, trRef, _isAdaptStage]);

  // 适配图片宽度
  useEffect(() => {
    if (!image || !trRef || !isNew || !myRef) {
      return;
    }

    if (trRef && trRef.current) {
      trRef.current.nodes([myRef.current]);
    }
  }, [image, trRef, isNew, myRef]);

  const size =
    props.width && props.height
      ? {
          width: Number(props.width),
          height: Number(props.height),
        }
      : {};

  return (
    <Image
      image={image}
      ref={myRef}
      // @ts-ignore
      onClick={banDrag ? noop : handleSelected}
      {...props}
      {...size}
      id={String(props.id)}
    />
  );
};

export default KonvaImage;
