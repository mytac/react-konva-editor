function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { createKeybindingsHandler } from 'tinykeys';

/*
快捷键需适配win系统和mac系统
删除：delete
复制：Ctrl+C；苹果系统Cmd+c
粘贴：Ctrl+V；苹果系统Cmd+v
撤销：Ctrl+Z；苹果系统Cmd+z
恢复：shift+ctrl+z
置顶：shift+ctrl+向上键
置底：shift+ctrl+向下键
多选移动：按住shift，可以加选文本/图片/商品，一起移动
*/
var KeyboardListener = /*#__PURE__*/_createClass(function KeyboardListener() {
  var _this = this;
  _classCallCheck(this, KeyboardListener);
  _defineProperty(this, "handler", void 0);
  _defineProperty(this, "canvasInstance", void 0);
  _defineProperty(this, "multiHandlerOn", void 0);
  _defineProperty(this, "multiHandlerOff", void 0);
  _defineProperty(this, "init", function (konvaCanvasPoint) {
    console.log('init');
    _this.canvasInstance = konvaCanvasPoint;
    if (!_this.handler) {
      var handler = createKeybindingsHandler({
        Delete: function Delete() {
          _this.canvasInstance.deleteItem();
        },
        BackSpace: function BackSpace() {
          _this.canvasInstance.deleteItem();
        },
        '$mod+KeyV': function $modKeyV(event) {
          event.preventDefault();
          _this.canvasInstance.copyItem();
        },
        '$mod+KeyZ': function $modKeyZ(event) {
          event.preventDefault();
          _this.canvasInstance.withdraw();
        },
        '$mod+Shift+KeyZ': function $modShiftKeyZ(event) {
          event.preventDefault();
          _this.canvasInstance.redo();
        },
        ArrowUp: function ArrowUp(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('y', -1);
        },
        ArrowDown: function ArrowDown(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('y', 1);
        },
        ArrowLeft: function ArrowLeft(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('x', -1);
        },
        ArrowRight: function ArrowRight(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('x', 1);
        },
        'Shift+ArrowUp': function ShiftArrowUp(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('y', -10);
        },
        'Shift+ArrowDown': function ShiftArrowDown(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('y', 10);
        },
        'Shift+ArrowLeft': function ShiftArrowLeft(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('x', -10);
        },
        'Shift+ArrowRight': function ShiftArrowRight(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayer('x', 10);
        },
        '$mod+Shift+ArrowUp': function $modShiftArrowUp(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayerLevel(1);
        },
        '$mod+Shift+ArrowDown': function $modShiftArrowDown(event) {
          event.preventDefault();
          _this.canvasInstance.moveLayerLevel(-1);
        }
      });
      _this.handler = handler;
    }
    if (!_this.multiHandlerOn) {
      _this.multiHandlerOn = function (e) {
        if (e.keyCode === 16) {
          console.log('shift on');
          // 打开multi
          // this.canvasInstance.toggleMultiSelected(true);
        }
      };
    }

    if (!_this.multiHandlerOff) {
      _this.multiHandlerOff = function (e) {
        if (e.keyCode === 16) {
          console.log('shift off');
          // 打开multi
          // this.canvasInstance.toggleMultiSelected(false);
        }
      };
    }
  });
  _defineProperty(this, "listening", function (target) {
    target.addEventListener('keydown', _this.handler);
    window.addEventListener('keydown', _this.multiHandlerOn);
    window.addEventListener('keyup', _this.multiHandlerOff);
  });
  _defineProperty(this, "destory", function (target) {
    target.removeEventListener('keydown', _this.handler);
    window.removeEventListener('keydown', _this.multiHandlerOn);
    window.removeEventListener('keyup', _this.multiHandlerOff);
    _this.handler = undefined;
    _this.multiHandlerOn = undefined;
    _this.multiHandlerOff = undefined;
  });
  this.handler = undefined;
  this.canvasInstance = undefined;
  this.multiHandlerOn = undefined;
  this.multiHandlerOff = undefined;
});
export default KeyboardListener;