function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var circularQueue = /*#__PURE__*/function () {
  function circularQueue(size) {
    var _this = this;
    var defaultElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    _classCallCheck(this, circularQueue);
    _defineProperty(this, "list", []);
    _defineProperty(this, "front", 0);
    _defineProperty(this, "tail", 0);
    _defineProperty(this, "length", 0);
    _defineProperty(this, "current", 0);
    // 清空current之后的元素
    _defineProperty(this, "clearAfterCurrent", function () {
      var i = _this.current;
      var length = _this.length;
      while ((i + 1) % length !== _this.tail) {
        var clearIndex = (i + 1) % length;
        _this.list[clearIndex] = undefined;
        i = clearIndex;
      }
      _this.tail = (_this.current + 1) % _this.length;
    });
    // 入队
    _defineProperty(this, "enqueue", function (item) {
      // 当入队时current不是处于队尾指针的前驱时，需要清空current到队尾之间的所有元素，并重置尾指针
      if (_this.isFull() && (_this.current + 1) % _this.length !== _this.tail) {
        _this.clearAfterCurrent();
      }
      if (_this.isFull()) {
        _this.tail = (_this.current + 1) % _this.length;
        // 满了移动头指针
        _this.front = (_this.front + 1) % _this.length;
      }
      // const index = this.tail % this.length;
      _this.list[_this.tail] = item;
      _this.current = _this.tail;
      _this.tail = (_this.tail + 1) % _this.length;
    });
    _defineProperty(this, "isEmpty", function () {
      return typeof _this.list[_this.front] === 'undefined';
    });
    _defineProperty(this, "isFull", function () {
      return _this.front === _this.tail && typeof _this.list[_this.front] !== 'undefined';
    });
    _defineProperty(this, "getCurrent", function () {
      return _this.list[_this.current];
    });
    // 改变当前current指向的
    // changeCurrent() {
    // }
    // 往右移一步 （尾指针方向）
    _defineProperty(this, "moveForward", function () {
      if (_this.canMoveForward) {
        _this.current = _this.isFull() ? (_this.current + 1 + _this.length) % _this.length : _this.current + 1;
      }
    });
    // 往左移一步 （头指针方向）
    _defineProperty(this, "moveBack", function () {
      if (_this.canMoveBack) {
        _this.current = _this.isFull() ? (_this.current - 1 + _this.length) % _this.length : _this.current - 1;
      }
    });
    _defineProperty(this, "print", function () {
      var i = 0;
      var p = _this.front;
      while (i < _this.length) {
        p = (p + 1) % _this.length;
        i++;
      }
    });
    // 清空当前队列中所有内容
    _defineProperty(this, "clear", function () {
      _this.length = 0;
      _this.front = 0;
      _this.current = 0;
      _this.list = [];
      _this.tail = 0;
    });
    this.length = size;
    this.front = 0;
    this.current = 0;
    this.list = new Array(size);
    this.list[0] = defaultElement;
    this.tail = 1;
  }
  _createClass(circularQueue, [{
    key: "canMoveForward",
    get: function get() {
      return !this.isEmpty() && (this.current + 1) % this.length !== this.tail;
    }
  }, {
    key: "canMoveBack",
    get: function get() {
      return this.current !== this.front;
    }
  }, {
    key: "dequeue",
    value:
    // 不涉及
    function dequeue() {}
  }]);
  return circularQueue;
}();
export default circularQueue;