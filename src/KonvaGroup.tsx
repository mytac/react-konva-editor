import React, { FC, useEffect } from 'react';
import { noop } from 'lodash';
import { Group } from 'react-konva';
import { IShapeInfo } from './type';

const KonvaGroup: FC<IShapeInfo> = ({
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
  isNew = false,
  ...props
}) => {
  // const ref=useRef<null>
  // 选中态，显示transformer
  useEffect(() => {
    if (isSelected && trRef?.current) {
      trRef.current.nodes([myRef.current]);
    }
  }, [isSelected, trRef, myRef]);

  useEffect(() => {
    // 新增的组
    if (isNew) {
      const width = myRef.current.width;
      handleInfo({ width, isNew: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRef, isNew]);

  const commonProps = {
    id: String(id),
    ref: myRef,
    onClick: banDrag ? noop : handleSelected,
    ...props,
  };

  const childrenWithProps = React.Children.map(props.children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { banDrag: true });
    }
    return child;
  });

  return <Group {...commonProps}>{childrenWithProps}</Group>;
};

export default KonvaGroup;
