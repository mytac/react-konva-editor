import React,{ FC, useEffect } from 'react';
import { noop } from 'lodash';
import { Rect, Circle, Arc, Star, Arrow, Ellipse } from 'react-konva';
import { IShapeInfo } from './type';

const KonvaShape: FC<IShapeInfo> = ({
  stageRef,
  myRef,
  setShowTransformer,
  handleSelected,
  handleInfo,
  onRef,
  banDrag,
  trRef,
  isSelected,
  fill,
  value,
  id,
  width = 100,
  height = 30,
  ...props
}) => {
  // 选中态，显示transformer
  useEffect(() => {
    if (isSelected && trRef?.current) {
      trRef.current.nodes([myRef.current]);
    }
  }, [isSelected, trRef, myRef]);

  const commonProps = {
    key: String(id),
    id: String(id),
    ref: myRef,
    onClick: banDrag ? noop : handleSelected,
    ...props,
  };

  if (value === 'rect') {
    return (
      //@ts-ignore
      <Rect fill={fill} width={width} height={height} {...commonProps} />
    );
  }

  if (value === 'circle') {
    const { radius } = props;
    return <Circle fill={fill} radius={radius} {...commonProps} />;
  }

  if (value === 'arc') {
    const { innerRadius = 100, outerRadius = 60, angle = 180 } = props;

    return (
      <Arc
        fill={fill}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        angle={angle}
        {...commonProps}
      />
    );
  }

  if (value === 'star') {
    const { innerRadius = 50, outerRadius = 100, numPoints = 5 } = props;
    return (
      <Star
        fill={fill}
        numPoints={numPoints}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        {...commonProps}
      />
    );
  }

  if (value === 'arrow') {
    const { points = [0, 0, 50, 50] } = props;
    return (
      <Arrow
        stroke={fill}
        fill={fill}
        points={points}
        pointerLength={10}
        pointerWidth={20}
        {...commonProps}
      />
    );
  }

  if (value === 'ellipse') {
    const { ellipseRadius = { radiusX: 40, radiusY: 20 } } = props;
    return <Ellipse {...ellipseRadius} fill={fill} {...commonProps} />;
  }

  return null;
};

export default KonvaShape;
