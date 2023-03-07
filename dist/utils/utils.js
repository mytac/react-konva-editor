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
var handleDuplicateId = function (canvasInfo) {
    if (canvasInfo === void 0) { canvasInfo = []; }
    var idMap = {};
    return canvasInfo.map(function (info) {
        if (info) {
            if (info.id && idMap[info.id]) {
                var newKey = Number(info.id) + Number((Math.random() * 100).toFixed());
                idMap[newKey] = 1;
                return __assign(__assign({}, info), { id: newKey });
            }
            else {
                idMap[info.id] = 1;
                return info;
            }
        }
        return info;
    });
};
var downloadURI = function (uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
export { handleDuplicateId, downloadURI };
