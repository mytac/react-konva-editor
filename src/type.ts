import { CSSProperties } from 'react';

type itemType = 'image' | 'text' | 'stage';

// props
export interface IaddItem {
  type: itemType;
  value: string;
}

export interface ReactKonvaEditorProps {
  width: number;
  height: number;
  backgroundColor?: string;
  addItem: IaddItem | undefined;
  backgroundStyle?: CSSProperties;
  selectedItemChange: any;
  maxStep: number;
  setRedo?: (a: boolean) => void;
  setWithdraw?: (a: boolean) => void;
  onChangeSelected: (a?: any) => void; //  监听当前元素改变
  bindRef: (a: any) => void;
  stepInfo?: Iinfo[];
  onChangeStep: (steps: any) => void;
}

// 内部的
export interface ICommonInfo {
  id: number;
  type: itemType;
  isSelected?: boolean;
  handleInfo: (a: any) => void;
  handleSelected?: (id: number) => void;
  setShowTransformer: (s: boolean) => void;
  stageRef?: any;
  myRef?: any;
  onRef?: (a: any) => void;
  banDrag?: boolean;
  isNew?: boolean;
  _isProportionalScaling?: string; // whether to scale the image proportionally
  x: number;
  y: number;
  w: number;
  h: number;
  stageScale: number;
  fontSize?: number;
  mType?: number;
  elementName?: string;
}
export interface IimageInfo extends ICommonInfo {
  type: 'image';
  value: string;
  trRef: any;
  width?: number;
  height?: number;
}

export interface ItextInfo extends ICommonInfo {
  type: 'text';
  value: string;
}

export interface ReactKonvaEditorEvents {
  exportToImage: (a: string) => void;
  exportToBASE64: () => Promise<string>;
  exportToFile: (format: string, filename: string) => File | undefined;
  withdraw: () => void;
  redo: () => void;
  canvasScale: (a: number) => void;
  deleteItem: () => void;
  copyItem: () => void;
  getInfo: () => any;
  moveLayer: (i: number) => void;
  clearSelected: () => void;
  setSelectedIndex: (id: number) => void;
  toogleLock: (index: number) => void;
}

export type Iinfo = IimageInfo | ItextInfo;
