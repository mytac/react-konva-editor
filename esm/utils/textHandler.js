function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SelectChangeListener = /*#__PURE__*/_createClass(function SelectChangeListener(target, originalText, handleAnchor, allWidth) {
  var _this = this;
  _classCallCheck(this, SelectChangeListener);
  _defineProperty(this, "target", void 0);
  _defineProperty(this, "originalText", void 0);
  _defineProperty(this, "handleAnchor", void 0);
  _defineProperty(this, "allWidth", void 0);
  _defineProperty(this, "handler", function (e) {
    var content = e.target.value;
    console.log('content', content);
    var selection = document.all ?
    // @ts-ignore
    document.selection.createRange().text : document.getSelection();
    var text = selection.toString();
    var startIndex = _this.originalText.indexOf(text);
    console.log('text', text);
    if (startIndex > -1 && content) {
      _this.handleAnchor(_this.allWidth, startIndex, startIndex + text.length, content.length);
    }
  });
  _defineProperty(this, "listen", function () {
    document.addEventListener('mouseup', _this.handler);
  });
  _defineProperty(this, "destory", function () {
    document.removeEventListener('mouseup', _this.handler);
  });
  this.target = target;
  this.originalText = originalText;
  this.handleAnchor = handleAnchor;
  this.allWidth = allWidth;
});
var getRealBoxSize = function getRealBoxSize(trRef, stageScale, textNode) {
  var _trRef$current$childr;
  var transformerBoxAttr = (_trRef$current$childr = trRef.current.children) === null || _trRef$current$childr === void 0 ? void 0 : _trRef$current$childr[0].attrs;
  var size = {};
  size.width = transformerBoxAttr.width * stageScale - textNode.padding() * 2 + 'px';
  size.height = transformerBoxAttr.height * stageScale - textNode.padding() * 2 + 'px';
  return size;
};
export { SelectChangeListener, getRealBoxSize };