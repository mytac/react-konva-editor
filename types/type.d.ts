import { CSSProperties } from 'react';
declare type itemType = 'image' | 'text' | 'stage';
export interface IaddItem {
    type: itemType;
    value: string;
}
export interface IProps {
    width: number;
    height: number;
    backgroundColor?: string;
    addItem: IaddItem | undefined;
    backgroundStyle?: CSSProperties;
    selectedItemChange: any;
    maxStep: number;
    setRedo?: (a: boolean) => void;
    setWithdraw?: (a: boolean) => void;
    onChangeSelected: (a?: any) => void;
    bindRef: (a: any) => void;
    stepInfo?: Iinfo[];
    onChangeStep: (steps: any) => void;
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
    onRef?: (a: any) => void;
    banDrag?: boolean;
    isNew?: boolean;
    _isProportionalScaling?: string;
    x: number;
    y: number;
    w: number;
    h: number;
    stageScale: number;
    fontSize?: number;
    mType?: number;
    elementName?: string;
}
export interface IimageInfo extends IcommonInfo {
    type: 'image';
    value: string;
    trRef: any;
    width?: number;
    height?: number;
}
export interface ItextInfo extends IcommonInfo {
    type: 'text';
    value: string;
}
export interface IFunc {
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
export declare type Iinfo = IimageInfo | ItextInfo;
export {};
