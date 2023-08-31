import { CSSProperties } from 'react';
export type itemType = 'image' | 'text' | 'shape' | 'stage' | 'group';
export type ShapeType =
  | 'rect'
  | 'circle'
  | 'arc'
  | 'star'
  | 'arrow'
  | 'ellipse';

// props
export interface IaddItem {
  type: itemType;
  value: string;
}


export interface IProps {
  width: number;
  height: number;
  backgroundColor?: string;
  addItem?: IaddItem;
  backgroundStyle?: CSSProperties;
  selectedItemChange?: any;
  maxStep?: number;
  setRedo?: (a: boolean) => void;
  setWithdraw?: (a: boolean) => void;
  onChangeSelected?: (a?: any) => void; //  监听当前元素改变
  bindRef?: (a: any) => void;
  stepInfo?: Iinfo[];
  onChangeStep?: (steps: any) => void;
}

// 内部的
export interface IcommonInfo {
  id: number;
  type: itemType;
  isSelected?: boolean;
  handleInfo: (a: any) => void;
  handleSelected?: (id: number) => void;
  setShowTransformer: (s: boolean) => void;
  stageRef?: any;
  myRef?: any;
  trRef?: any;
  onRef?: (a: any) => void;
  banDrag?: boolean;
  isNew?: boolean;
  x: number;
  y: number;
  // w: number;
  // h: number;
  scaleX?: number;
  scaleY?: number;
  stageScale: number;
  fontSize?: number;
  mType?: number;
  elementName?: string;
  label?: string; // 元素层名称
  name?: string; //psd解析出来的图层名称
}

export interface IimageInfo extends IcommonInfo {
  type: 'image';
  value: string;
  trRef: any;
  crop: any;
  width?: number;
  height?: number;
  _isAdaptStage?: number;
  _isProportionalScaling?: number;
  _isChangedCrop?: boolean;
}

export interface IShapeInfo extends IcommonInfo {
  type: 'shape';
  value: ShapeType;
  fill?: string;
  width?: number;
  height?: number;
  stroke?: string; // 描边颜色
  strokeWidth?: number; // 描边宽度

  // 以下为Rect专属
  cornerRadius?: number | Array<number>;

  // 以下为Circle专属props
  radius?: number;

  // 以下为arc专属字段
  innerRadius?: number; // 内径
  outerRadius?: number; // 外径
  angle?: number; // 弧形圆角

  // 以下为star专属
  numPoints?: number;

  // 以下为arrow专属
  points?: Array<number>;

  // 以下为ellipse专属
  ellipseRadius?: { radiusX: number; radiusY: number };
  // pointerLength?: number;
  // pointerWidth?: number;
}

export interface IgroupInfo extends IcommonInfo {
  type: 'group';
  elements: Array<IimageInfo | ItextInfo>;
}

export interface ItextInfo extends IcommonInfo {
  type: 'text';
  value: string;
  color?: 'string';
}

export interface IFunc {
  exportToImage: (
    a: string,
    opt?: { scale?: number; quality?: number; fileType?: string }
  ) => void;
  exportToBASE64: () => Promise<string>;
  exportToFile: (format: string, filename: string) => File | undefined;
  withdraw: () => void;
  redo: () => void;
  canvasScale: (a: number) => void;
  deleteItem: () => void;
  copyItem: () => void;
  getInfo: () => any;
  moveLayerLevel: (i: number) => void;
  moveLayer: (direction: string, delta: number) => void;
  clearSelected: () => void;
  setSelectedIndex: (id: LayerIdType) => void;
  toogleLock: (id: LayerIdType) => void;
  toggleMultiSelected: (state: boolean) => void;
  madeGroup: (layers: any) => void;
  divideGroup: (groupId: string) => void;
  changeLayerInfoById: (id: LayerIdType, item: object) => void;
  // getSelectedInfo: () => Iinfo | Array<Iinfo>;
}

export type Iinfo = IimageInfo | ItextInfo | IShapeInfo | IgroupInfo;

export type LayerIdType = string | number | Array<number | string>;
