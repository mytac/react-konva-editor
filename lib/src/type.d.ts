import { CSSProperties } from 'react';
export type itemType = 'image' | 'text' | 'shape' | 'stage' | 'group';
export type ShapeType = 'rect' | 'circle' | 'arc' | 'star' | 'arrow' | 'ellipse';
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
    onChangeSelected?: (a?: any) => void;
    bindRef?: (a: any) => void;
    stepInfo?: Iinfo[];
    onChangeStep?: (steps: any) => void;
}
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
    scaleX?: number;
    scaleY?: number;
    stageScale: number;
    fontSize?: number;
    mType?: number;
    elementName?: string;
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
    stroke?: string;
    strokeWidth?: number;
    cornerRadius?: number | Array<number>;
    radius?: number;
    innerRadius?: number;
    outerRadius?: number;
    angle?: number;
    numPoints?: number;
    points?: Array<number>;
    ellipseRadius?: {
        radiusX: number;
        radiusY: number;
    };
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
    exportToImage: (a: string, opt?: {
        scale?: number;
        quality?: number;
        fileType?: string;
    }) => void;
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
    setSelectedIndex: (id: number) => void;
    toogleLock: (index: number) => void;
    toggleMultiSelected: (state: boolean) => void;
    madeGroup: (layers: any) => void;
    divideGroup: (groupId: string) => void;
}
export type Iinfo = IimageInfo | ItextInfo | IShapeInfo | IgroupInfo;
