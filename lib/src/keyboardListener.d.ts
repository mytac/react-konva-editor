declare class KeyboardListener {
    handler: any;
    canvasInstance: any;
    multiHandlerOn: any;
    multiHandlerOff: any;
    constructor();
    init: (konvaCanvasPoint: any) => void;
    listening: (target: any) => void;
    destory: (target: any) => void;
}
export default KeyboardListener;
