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
var _coreAdaption = function (substract, ratio, containerW, containerH) {
    var res = {};
    switch (true) {
        case substract > 0: {
            res.width = Math.round(containerH * ratio);
            res.height = containerH;
            break;
        }
        case substract < 0: {
            res.width = containerW;
            res.height = Math.round(containerW / ratio);
            break;
        }
        default: {
            res.height = containerH;
            res.width = containerW;
        }
    }
    return res;
};
var _computeCenterInStage = function (imgW, imgH, stageW, stageH) {
    var x = Math.round((stageW - imgW) / 2);
    var y = Math.round((stageH - imgH) / 2);
    return { x: x, y: y, width: imgW, height: imgH };
};
var adaptReplaceImage = function (image, oldSize) {
    if (image && oldSize) {
        var imgW = image.width;
        var imgH = image.height;
        var curRatio = imgW / imgH;
        var oldW = oldSize.width;
        var oldH = oldSize.height;
        var oldRatio = oldW / oldH;
        var substract = oldRatio - curRatio;
        var res = _coreAdaption(substract, curRatio, oldW, oldH);
        return res;
    }
};
var adaptNewImage = function (image, stage) {
    if (!stage || !image)
        return;
    var imgW = image.width;
    var imgH = image.height;
    var stageW = stage.width();
    var stageH = stage.height();
    if (imgW < stageW && imgH < stageH) {
        return _computeCenterInStage(imgW, imgH, stageW, stageH);
    }
    var stageRatio = stageW / stageH;
    var curRatio = imgW / imgH;
    var substract = stageRatio - curRatio;
    var size = _coreAdaption(substract, curRatio, stageW, stageH);
    if (size.width && size.height) {
        var coordinate = _computeCenterInStage(size.width, size.height, stageW, stageH);
        return __assign(__assign({}, coordinate), size);
    }
    else {
        return size;
    }
};
var stageScaleAdapt = function (width, height) {
    var max = Math.max(width, height);
    switch (true) {
        case max <= 960:
            return 0.7;
        case max <= 1200:
            return 0.6;
        case max <= 1400:
            return 0.5;
        case max <= 1700:
            return 0.4;
        default:
            return 0.3;
    }
};
var stageScaleAutoAdapt = function (stageW, stageH, imgW, imgH) {
    if (imgW < stageW && imgH < stageH) {
        return 1;
    }
    else {
        var xScale = imgW / stageW;
        var yScale = imgH / stageH;
        return Math.floor((1 / Math.max(xScale, yScale)) * 100) / 100;
    }
};
export { adaptReplaceImage, adaptNewImage, stageScaleAdapt, stageScaleAutoAdapt, };
