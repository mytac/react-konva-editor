type resType = {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
};
declare const adaptReplaceImage: (image: any, oldSize: {
    width: number;
    height: number;
}) => resType | undefined;
declare const adaptNewImage: (image: any, stage: any) => resType | undefined;
declare const stageScaleAdapt: (width: number, height: number) => 0.7 | 0.6 | 0.5 | 0.4 | 0.3;
declare const stageScaleAutoAdapt: (stageW: number, stageH: number, imgW: number, imgH: number) => number;
declare const cropImageAdaptStage: (crop: any, changedWidth: number, changedHeight: number) => {
    x: number;
    y: number;
};
export { adaptReplaceImage, adaptNewImage, cropImageAdaptStage, stageScaleAdapt, stageScaleAutoAdapt, };
