import { FC, useEffect, Children, ReactNode } from 'react';
import { noop } from 'lodash';
import { Group } from 'react-konva';
import { IShapeInfo } from './type';

interface GroupInterface extends IShapeInfo {
  children: ReactNode;
}

const KonvaGroup: FC<GroupInterface> = ({
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
    id: String(id),
    ref: myRef,
    onClick: banDrag ? noop : handleSelected,
    ...props,
  };

  if (props?.children) {
    return (
      <Group {...commonProps}>
        {Children.map(props.children, (child) => child)}
      </Group>
    );
  }

  return null;
};

export default KonvaGroup;
