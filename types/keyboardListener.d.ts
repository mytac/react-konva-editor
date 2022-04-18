declare class KeyboardListener {
    handler: any;
    canvasInstance: any;
    constructor();
    init: (konvaCanvasPoint: any) => void;
    listening: (target: any) => void;
    destory: (target: any) => void;
}
export default KeyboardListener;
