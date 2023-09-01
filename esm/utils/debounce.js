var debounce = function debounce() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (a, b) {};
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var timer = null;
  // @ts-ignore
  return function () {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(void 0, params);
    }, time);
  };
};
export default debounce;