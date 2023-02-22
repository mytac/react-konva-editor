"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_konva_1 = require("react-konva");
const handleKonvaItem_1 = __importDefault(require("../utils/handleKonvaItem"));
const withTransform = (Component) => {
    const Inner = (props) => {
        const { isSelected = false, handleInfo = () => { }, opacity = 1, handleSelected, banDrag, } = props;
        const [showTransformer, setShowTransformer] = (0, react_1.useState)(true);
        const eleRef = (0, react_1.useRef)(null);
        const trRef = (0, react_1.useRef)(null);
        (0, react_1.useEffect)(() => {
            const transformer = trRef.current;
            if (isSelected && eleRef?.current && transformer) {
                if (props?.type === 'text') {
                    transformer.nodes([eleRef.current]);
                    transformer.getLayer()?.batchDraw();
                }
            }
        }, [isSelected]);
        const handleDragStart = (0, react_1.useCallback)(() => {
            handleSelected(eleRef);
        }, [handleSelected]);
        const handleDragEnd = (e) => {
            const info = (0, handleKonvaItem_1.default)(e.target);
            handleInfo(info);
        };
        (0, react_1.useEffect)(() => {
            if (trRef) {
                const tr = trRef.current;
                if (isSelected && showTransformer) {
                    tr.show();
                    tr.forceUpdate();
                }
                else {
                    tr.hide();
                }
            }
        }, [isSelected, showTransformer, trRef]);
        const boundBoxFunc = (oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
            }
            return newBox;
        };
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Component, { onDragStart: handleDragStart, onDragEnd: handleDragEnd, shadowColor: "black", opacity: opacity, draggable: !banDrag, trRef: trRef, myRef: eleRef, setShowTransformer: setShowTransformer, ...props, handleSelected: handleDragStart }), (0, jsx_runtime_1.jsx)(react_konva_1.Transformer, { ref: trRef, boundBoxFunc: boundBoxFunc, resizeEnabled: !banDrag, rotateEnabled: !banDrag, onTransformEnd: (a) => {
                        handleInfo((0, handleKonvaItem_1.default)(a.target));
                    } })] }));
    };
    return Inner;
};
exports.default = withTransform;
