declare class SelectChangeListener {
    target: HTMLElement;
    originalText: string;
    handleAnchor: (allWidth: number, start: number, end: number, total: number) => void;
    allWidth: number;
    constructor(target: HTMLElement, originalText: string, handleAnchor: (allWidth: number, start: number, end: number, total: number) => void, allWidth: number);
    handler: (e: any) => void;
    listen: () => void;
    destory: () => void;
}
declare const getRealBoxSize: (trRef: any, stageScale: number, textNode: any) => any;
export { SelectChangeListener, getRealBoxSize };
