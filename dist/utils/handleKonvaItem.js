var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var handleKonvaItem = function (konvaNode) {
    var attrs = konvaNode.attrs, textWidth = konvaNode.textWidth, textHeight = konvaNode.textHeight;
    var _a = attrs.scaleX, scaleX = _a === void 0 ? 1 : _a, _b = attrs.scaleY, scaleY = _b === void 0 ? 1 : _b, rotation = attrs.rotation, skewX = attrs.skewX, skewY = attrs.skewY, _c = attrs.x, x = _c === void 0 ? 0 : _c, _d = attrs.y, y = _d === void 0 ? 0 : _d, type = attrs.type;
    var otherProperty = {};
    if (type === 'text') {
        otherProperty.x = Math.round(x);
        otherProperty.y = Math.round(y);
        otherProperty.w = Math.round(textWidth * scaleX);
        otherProperty.h = Math.round(textHeight * scaleY);
    }
    return __assign({ scaleX: scaleX, scaleY: scaleY, rotation: rotation, skewX: skewX, skewY: skewY, x: x, y: y }, otherProperty);
};
export default handleKonvaItem;
