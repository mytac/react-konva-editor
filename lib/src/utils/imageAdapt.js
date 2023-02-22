"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stageScaleAutoAdapt = exports.stageScaleAdapt = exports.cropImageAdaptStage = exports.adaptNewImage = exports.adaptReplaceImage = void 0;
const _coreAdaption = (substract, ratio, containerW, containerH) => {
    const res = {};
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
const _computeCenterInStage = (imgW, imgH, stageW, stageH) => {
    const x = Math.round((stageW - imgW) / 2);
    const y = Math.round((stageH - imgH) / 2);
    return { x, y, width: imgW, height: imgH };
};
const adaptReplaceImage = (image, oldSize) => {
    if (image && oldSize) {
        const imgW = image.width;
        const imgH = image.height;
        const curRatio = imgW / imgH;
        const oldW = oldSize.width;
        const oldH = oldSize.height;
        const oldRatio = oldW / oldH;
        const substract = oldRatio - curRatio;
        const res = _coreAdaption(substract, curRatio, oldW, oldH);
        return res;
    }
};
exports.adaptReplaceImage = adaptReplaceImage;
const adaptNewImage = (image, stage) => {
    if (!stage || !image)
        return;
    const imgW = image.width;
    const imgH = image.height;
    const stageW = stage.width();
    const stageH = stage.height();
    if (imgW < stageW && imgH < stageH) {
        return _computeCenterInStage(imgW, imgH, stageW, stageH);
    }
    const stageRatio = stageW / stageH;
    const curRatio = imgW / imgH;
    const substract = stageRatio - curRatio;
    const size = _coreAdaption(substract, curRatio, stageW, stageH);
    if (size.width && size.height) {
        const coordinate = _computeCenterInStage(size.width, size.height, stageW, stageH);
        return { ...coordinate, ...size };
    }
    else {
        return size;
    }
};
exports.adaptNewImage = adaptNewImage;
const stageScaleAdapt = (width, height) => {
    const max = Math.max(width, height);
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
exports.stageScaleAdapt = stageScaleAdapt;
const stageScaleAutoAdapt = (stageW, stageH, imgW, imgH) => {
    if (imgW < stageW && imgH < stageH) {
        return 1;
    }
    else {
        const xScale = imgW / stageW;
        const yScale = imgH / stageH;
        return Math.floor((1 / Math.max(xScale, yScale)) * 100) / 100;
    }
};
exports.stageScaleAutoAdapt = stageScaleAutoAdapt;
const cropImageAdaptStage = (crop, changedWidth, changedHeight) => {
    const { x, y, width, height } = crop;
    const kx = width / changedWidth;
    const ky = height / changedHeight;
    return { x: x / kx, y: y / ky };
};
exports.cropImageAdaptStage = cropImageAdaptStage;
