import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import Konva from 'konva';
import { Transformer } from 'react-konva';
import handleKonvaItem from '../utils/handleKonvaItem';

const withTransform = (Component: FC) => {
  const Inner = (props: {
    isSelected: boolean;
    handleInfo: (a: any) => void;
    handleSelected: (ref: any) => void;
    rotation?: number;
    opacity?: number;
    banDrag?: boolean;
    type?: 'text' | 'image';
  }) => {
    const {
      isSelected = false,
      handleInfo = () => {},
      opacity = 1,
      handleSelected,
      banDrag,
    } = props;

    const [showTransformer, setShowTransformer] = useState(true);

    const eleRef = useRef(null);
    const trRef = useRef<Konva.Transformer | null>(null);

    useEffect(() => {
      const transformer = trRef.current;
      if (isSelected && eleRef?.current && transformer) {
        if (props?.type === 'text') {
          // @ts-ignore
          transformer.nodes([eleRef.current]);
          transformer.getLayer()?.batchDraw();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected]);

    const handleDragStart = useCallback(() => {
      handleSelected(eleRef);
    }, [handleSelected]);

    const handleDragEnd = (e: any) => {
      const info = handleKonvaItem(e.target);
      handleInfo(info);
    };

    useEffect(() => {
      if (trRef) {
        const tr = trRef.current;
        if (isSelected && showTransformer) {
          // @ts-ignore
          tr.show();
          // @ts-ignore
          tr.forceUpdate();
        } else {
          // @ts-ignore
          tr.hide();
        }
      }
    }, [isSelected, showTransformer, trRef]);

    const boundBoxFunc = (oldBox: any, newBox: any) => {
      if (newBox.width < 5 || newBox.height < 5) {
        return oldBox;
      }
      return newBox;
    };

    return (
      <>
        <Component
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          shadowColor="black"
          // shadowOffsetX={info.isDragging ? 10 : 5}
          // shadowOffsetY={info.isDragging ? 10 : 5}
          // scaleX={info.isDragging ? 1.2 : 1}
          // scaleY={info.isDragging ? 1.2 : 1}
          opacity={opacity}
          draggable={!banDrag}
          trRef={trRef}
          myRef={eleRef}
          setShowTransformer={setShowTransformer}
          {...props}
          // @ts-ignore
          handleSelected={handleDragStart}
        />

        <Transformer
          ref={trRef}
          boundBoxFunc={boundBoxFunc}
          resizeEnabled={!banDrag}
          rotateEnabled={!banDrag}
          onTransformEnd={(a) => {
            handleInfo(handleKonvaItem(a.target));
          }}
        />
      </>
    );
  };
  return Inner;
};

export default withTransform;
