"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lodash_1 = require("lodash");
const react_konva_1 = require("react-konva");
const use_image_1 = __importDefault(require("use-image"));
const utils_1 = require("./utils");
const KonvaImage = ({ stageRef, myRef, setShowTransformer, handleSelected, handleInfo, onRef, value, banDrag, trRef, crop, isNew, isSelected, _isAdaptStage, _isProportionalScaling, _isChangedCrop, ...props }) => {
    const [image] = (0, use_image_1.default)(value, 'anonymous');
    (0, react_1.useEffect)(() => {
        if (image && (isNew || _isChangedCrop) && _isAdaptStage && stageRef) {
            const item = utils_1.AdaptStrategy.adaptNewImage(_isChangedCrop ? crop : image, stageRef.current);
            if (item) {
                const { width, height } = item;
                if (_isChangedCrop && width && height) {
                    item.crop = { ...crop };
                }
                handleInfo({
                    ...item,
                    width: Number(width),
                    height: Number(height),
                    scaleX: 1,
                    scaleY: 1,
                    _isChangedCrop: false,
                    _isAdaptStage: false,
                    _isProportionalScaling: false,
                });
                trRef.current.nodes([myRef.current]);
            }
        }
    }, [isNew, _isAdaptStage, image, stageRef, trRef, myRef]);
    (0, react_1.useEffect)(() => {
        if (onRef) {
            onRef(myRef);
        }
    }, [myRef]);
    (0, react_1.useEffect)(() => {
        const prevLayer = trRef?.current;
        const { height, width, scaleX = 1, scaleY = 1 } = props;
        const prevW = prevLayer.getWidth();
        const prevH = prevLayer.getHeight();
        let oldSize;
        if (width && height) {
            oldSize = {
                width: width * scaleX,
                height: height * scaleY,
            };
        }
        else if (!isNaN(prevW)) {
            oldSize = {
                width: prevW,
                height: prevH,
            };
        }
        else
            return;
        if (isSelected && _isProportionalScaling && oldSize) {
            const _isP = myRef?.current?.attrs?._isProportionalScaling || _isProportionalScaling;
            if (_isP && image && oldSize) {
                const item = utils_1.AdaptStrategy.adaptReplaceImage(image, oldSize);
                if (item) {
                    handleInfo({
                        ...item,
                        scaleX: 1,
                        scaleY: 1,
                        _isProportionalScaling: 0,
                    });
                }
            }
            trRef.current.nodes([myRef.current]);
        }
    }, [
        image,
        myRef,
        isNew,
        trRef.current,
        isSelected,
        _isProportionalScaling,
        props.width,
        props.height,
    ]);
    (0, react_1.useEffect)(() => {
        if (trRef && trRef.current) {
            trRef.current.nodes([myRef.current]);
        }
    }, [image, trRef, myRef]);
    return ((0, jsx_runtime_1.jsx)(react_konva_1.Image, { image: image, ref: myRef, onClick: banDrag ? lodash_1.noop : handleSelected, id: String(props.id), crop: crop, ...props }));
};
exports.default = KonvaImage;
