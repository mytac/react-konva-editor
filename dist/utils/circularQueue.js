var circularQueue = (function () {
    function circularQueue(size, defaultElement) {
        if (defaultElement === void 0) { defaultElement = []; }
        var _this = this;
        this.list = [];
        this.front = 0;
        this.tail = 0;
        this.length = 0;
        this.current = 0;
        this.clearAfterCurrent = function () {
            var i = _this.current;
            var length = _this.length;
            while ((i + 1) % length !== _this.tail) {
                var clearIndex = (i + 1) % length;
                _this.list[clearIndex] = undefined;
                i = clearIndex;
            }
            _this.tail = (_this.current + 1) % _this.length;
        };
        this.enqueue = function (item) {
            if (_this.isFull() && (_this.current + 1) % _this.length !== _this.tail) {
                _this.clearAfterCurrent();
            }
            if (_this.isFull()) {
                _this.tail = (_this.current + 1) % _this.length;
                _this.front = (_this.front + 1) % _this.length;
            }
            _this.list[_this.tail] = item;
            _this.current = _this.tail;
            _this.tail = (_this.tail + 1) % _this.length;
        };
        this.isEmpty = function () {
            return typeof _this.list[_this.front] === 'undefined';
        };
        this.isFull = function () {
            return (_this.front === _this.tail && typeof _this.list[_this.front] !== 'undefined');
        };
        this.getCurrent = function () {
            return _this.list[_this.current];
        };
        this.moveForward = function () {
            if (_this.canMoveForward) {
                _this.current = _this.isFull()
                    ? (_this.current + 1 + _this.length) % _this.length
                    : _this.current + 1;
            }
        };
        this.moveBack = function () {
            if (_this.canMoveBack) {
                _this.current = _this.isFull()
                    ? (_this.current - 1 + _this.length) % _this.length
                    : _this.current - 1;
            }
        };
        this.print = function () {
            var i = 0;
            var p = _this.front;
            while (i < _this.length) {
                p = (p + 1) % _this.length;
                i++;
            }
        };
        this.clear = function () {
            _this.length = 0;
            _this.front = 0;
            _this.current = 0;
            _this.list = [];
            _this.tail = 0;
        };
        this.length = size;
        this.front = 0;
        this.current = 0;
        this.list = new Array(size);
        this.list[0] = defaultElement;
        this.tail = 1;
    }
    Object.defineProperty(circularQueue.prototype, "canMoveForward", {
        get: function () {
            return !this.isEmpty() && (this.current + 1) % this.length !== this.tail;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(circularQueue.prototype, "canMoveBack", {
        get: function () {
            return this.current !== this.front;
        },
        enumerable: false,
        configurable: true
    });
    circularQueue.prototype.dequeue = function () { };
    return circularQueue;
}());
export default circularQueue;
