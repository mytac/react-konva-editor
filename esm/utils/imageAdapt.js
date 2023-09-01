function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable max-len */

var _coreAdaption = function _coreAdaption(substract, ratio, containerW, containerH) {
  var res = {};
  switch (true) {
    case substract > 0:
      {
        res.width = Math.round(containerH * ratio);
        res.height = containerH;
        break;
      }
    case substract < 0:
      {
        res.width = containerW;
        res.height = Math.round(containerW / ratio);
        break;
      }
    default:
      {
        res.height = containerH;
        res.width = containerW;
      }
  }
  return res;
};

/** generate the coordinate of the image placed in the center of the stage.
 */
var _computeCenterInStage = function _computeCenterInStage(imgW, imgH, stageW, stageH) {
  var x = Math.round((stageW - imgW) / 2);
  var y = Math.round((stageH - imgH) / 2);
  return {
    x: x,
    y: y,
    width: imgW,
    height: imgH
  };
};

/** generate properties of konvaImage for image-replacement.
 * The rules of image-replacement:
    1. Compute the original ratio:original_ratio=oldImage.width/oldImage.height
    2. Compute the current ratio:current_ratio=cur.width/cur.height
    3. if the original_ratio is greater than current_ratio, the current image is visually vertical,
       change the height of current into the old one.
    4. if the original_ratio is less than current_ratio, the current image is visually horizontal,
       change the width of current into the old one.
    5. if both of the ratio are equal,just scaling the current one to the same ratio as the old one.
 */
var adaptReplaceImage = function adaptReplaceImage(image, oldSize) {
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

/** generate properties of konvaImage for coming-image in stage.
 *  The rules of coming-image rendering:
 *   1. compute the size of stage and image.
 *      if both of the width and height of the image is less than those of the stage, just return.
 *   2. compute the ratio of stage: ratio=stage.width/stage.height.if the ratio is much than 1,the stage is visually horizontal.
 *      The height of the coming-image must be changed into the stage's height.
 *   3. if the ratio is less than 1,the stage is visually vertical.
 *      The width of the coming-image must be changed into the stage's width.
 */
var adaptNewImage = function adaptNewImage(image, stage) {
  if (!stage || !image) return;
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
    return _objectSpread(_objectSpread({}, coordinate), size);
  } else {
    return size;
  }
};

/**
 * 根据画布尺寸，适配相应的缩放比例
 */
var stageScaleAdapt = function stageScaleAdapt(width, height) {
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

/**
 * 根据舞台宽高和画布宽高，自动计算缩放比例
 */
var stageScaleAutoAdapt = function stageScaleAutoAdapt(stageW, stageH, imgW, imgH) {
  if (imgW < stageW && imgH < stageH) {
    return 1; // 画布比舞台小的不缩放
  } else {
    var xScale = imgW / stageW;
    var yScale = imgH / stageH;
    return Math.floor(1 / Math.max(xScale, yScale) * 100) / 100;
  }
};
var cropImageAdaptStage = function cropImageAdaptStage(crop, changedWidth, changedHeight) {
  var x = crop.x,
    y = crop.y,
    width = crop.width,
    height = crop.height;
  var kx = width / changedWidth;
  var ky = height / changedHeight;
  return {
    x: x / kx,
    y: y / ky
  };
  // return { x: x, y: y };
};

export { adaptReplaceImage, adaptNewImage, cropImageAdaptStage, stageScaleAdapt, stageScaleAutoAdapt };