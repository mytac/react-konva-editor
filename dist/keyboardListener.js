import { createKeybindingsHandler } from 'tinykeys';
var KeyboardListener = (function () {
    function KeyboardListener() {
        var _this = this;
        this.init = function (konvaCanvasPoint) {
            _this.canvasInstance = konvaCanvasPoint;
            if (!_this.handler) {
                var handler = createKeybindingsHandler({
                    Delete: function () {
                        _this.canvasInstance.deleteItem();
                    },
                    BackSpace: function () {
                        _this.canvasInstance.deleteItem();
                    },
                    '$mod+KeyV': function (event) {
                        event.preventDefault();
                        _this.canvasInstance.copyItem();
                    },
                    '$mod+KeyZ': function (event) {
                        event.preventDefault();
                        _this.canvasInstance.withdraw();
                    },
                    '$mod+Shift+KeyZ': function (event) {
                        event.preventDefault();
                        _this.canvasInstance.redo();
                    },
                    '$mod+Shift+ArrowUp': function (event) {
                        event.preventDefault();
                        _this.canvasInstance.moveLayer(1);
                    },
                    '$mod+Shift+ArrowDown': function (event) {
                        event.preventDefault();
                        _this.canvasInstance.moveLayer(-1);
                    },
                });
                _this.handler = handler;
            }
        };
        this.listening = function (target) {
            target.addEventListener('keydown', _this.handler);
        };
        this.destory = function (target) {
            target.removeEventListener('keydown', _this.handler);
            _this.handler = undefined;
        };
        this.handler = undefined;
        this.canvasInstance = undefined;
    }
    return KeyboardListener;
}());
export default KeyboardListener;
