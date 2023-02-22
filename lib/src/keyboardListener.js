"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tinykeys_1 = require("tinykeys");
class KeyboardListener {
    constructor() {
        this.init = (konvaCanvasPoint) => {
            console.log('init');
            this.canvasInstance = konvaCanvasPoint;
            if (!this.handler) {
                const handler = (0, tinykeys_1.createKeybindingsHandler)({
                    Delete: () => {
                        this.canvasInstance.deleteItem();
                    },
                    BackSpace: () => {
                        this.canvasInstance.deleteItem();
                    },
                    '$mod+KeyV': (event) => {
                        event.preventDefault();
                        this.canvasInstance.copyItem();
                    },
                    '$mod+KeyZ': (event) => {
                        event.preventDefault();
                        this.canvasInstance.withdraw();
                    },
                    '$mod+Shift+KeyZ': (event) => {
                        event.preventDefault();
                        this.canvasInstance.redo();
                    },
                    ArrowUp: (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('y', -1);
                    },
                    ArrowDown: (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('y', 1);
                    },
                    ArrowLeft: (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('x', -1);
                    },
                    ArrowRight: (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('x', 1);
                    },
                    'Shift+ArrowUp': (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('y', -10);
                    },
                    'Shift+ArrowDown': (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('y', 10);
                    },
                    'Shift+ArrowLeft': (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('x', -10);
                    },
                    'Shift+ArrowRight': (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayer('x', 10);
                    },
                    '$mod+Shift+ArrowUp': (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayerLevel(1);
                    },
                    '$mod+Shift+ArrowDown': (event) => {
                        event.preventDefault();
                        this.canvasInstance.moveLayerLevel(-1);
                    },
                });
                this.handler = handler;
            }
            if (!this.multiHandlerOn) {
                this.multiHandlerOn = (e) => {
                    if (e.keyCode === 16) {
                        console.log('shift on');
                    }
                };
            }
            if (!this.multiHandlerOff) {
                this.multiHandlerOff = (e) => {
                    if (e.keyCode === 16) {
                        console.log('shift off');
                    }
                };
            }
        };
        this.listening = (target) => {
            target.addEventListener('keydown', this.handler);
            window.addEventListener('keydown', this.multiHandlerOn);
            window.addEventListener('keyup', this.multiHandlerOff);
        };
        this.destory = (target) => {
            target.removeEventListener('keydown', this.handler);
            window.removeEventListener('keydown', this.multiHandlerOn);
            window.removeEventListener('keyup', this.multiHandlerOff);
            this.handler = undefined;
            this.multiHandlerOn = undefined;
            this.multiHandlerOff = undefined;
        };
        this.handler = undefined;
        this.canvasInstance = undefined;
        this.multiHandlerOn = undefined;
        this.multiHandlerOff = undefined;
    }
}
exports.default = KeyboardListener;
