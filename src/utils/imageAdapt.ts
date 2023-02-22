/* eslint-disable max-len */
type resType = { width?: number; height?: number; x?: number; y?: number };

const _coreAdaption = (
  substract: number,
  ratio: number,
  containerW: number,
  containerH: number
) => {
  const res: resType = {};

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

/** generate the coordinate of the image placed in the center of the stage.
 */
const _computeCenterInStage = (
  imgW: number,
  imgH: number,
  stageW: number,
  stageH: number
) => {
  const x = Math.round((stageW - imgW) / 2);
  const y = Math.round((stageH - imgH) / 2);
  return { x, y, width: imgW, height: imgH };
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
const adaptReplaceImage = (
  image: any,
  oldSize: { width: number; height: number }
) => {
  if (image && oldSize) {
    const imgW = image.width;
    const imgH = image.height;
    const curRatio = imgW / imgH;

    const oldW = oldSize.width;
    const oldH = oldSize.height;
    const oldRatio = oldW / oldH;
    const substract = oldRatio - curRatio;
    const res: resType = _coreAdaption(substract, curRatio, oldW, oldH);
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
const adaptNewImage = (image: any, stage: any) => {
  if (!stage || !image) return;

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

  const size: resType = _coreAdaption(substract, curRatio, stageW, stageH);
  if (size.width && size.height) {
    const coordinate = _computeCenterInStage(
      size.width,
      size.height,
      stageW,
      stageH
    );
    return { ...coordinate, ...size };
  } else {
    return size;
  }
};

/**
 * 根据画布尺寸，适配相应的缩放比例
 */
const stageScaleAdapt = (width: number, height: number) => {
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

/**
 * 根据舞台宽高和画布宽高，自动计算缩放比例
 */
const stageScaleAutoAdapt = (
  stageW: number,
  stageH: number,
  imgW: number,
  imgH: number
) => {
  if (imgW < stageW && imgH < stageH) {
    return 1; // 画布比舞台小的不缩放
  } else {
    const xScale = imgW / stageW;
    const yScale = imgH / stageH;
    return Math.floor((1 / Math.max(xScale, yScale)) * 100) / 100;
  }
};

const cropImageAdaptStage = (
  crop: any,
  changedWidth: number,
  changedHeight: number
) => {
  const { x, y, width, height } = crop;
  const kx = width / changedWidth;
  const ky = height / changedHeight;
  return { x: x / kx, y: y / ky };
  // return { x: x, y: y };
};

export {
  adaptReplaceImage,
  adaptNewImage,
  cropImageAdaptStage,
  stageScaleAdapt,
  stageScaleAutoAdapt,
};
