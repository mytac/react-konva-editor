var debounce = function (callback, time) {
    if (callback === void 0) { callback = function (a, b) { }; }
    if (time === void 0) { time = 100; }
    var timer = null;
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(void 0, params);
        }, time);
    };
};
export default debounce;
