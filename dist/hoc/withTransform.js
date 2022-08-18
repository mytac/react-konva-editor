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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef, useCallback } from 'react';
import { Transformer } from 'react-konva';
import handleKonvaItem from '../utils/handleKonvaItem';
var withTransform = function (Component) {
    var Inner = function (props) {
        var _a = props.isSelected, isSelected = _a === void 0 ? false : _a, _b = props.handleInfo, handleInfo = _b === void 0 ? function () { } : _b, _c = props.opacity, opacity = _c === void 0 ? 1 : _c, handleSelected = props.handleSelected, banDrag = props.banDrag;
        var _d = useState(true), showTransformer = _d[0], setShowTransformer = _d[1];
        var eleRef = useRef(null);
        var trRef = useRef(null);
        useEffect(function () {
            var _a;
            var transformer = trRef.current;
            if (isSelected && (eleRef === null || eleRef === void 0 ? void 0 : eleRef.current) && transformer) {
                if ((props === null || props === void 0 ? void 0 : props.type) === 'text') {
                    transformer.nodes([eleRef.current]);
                    (_a = transformer.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
                }
            }
        }, [isSelected]);
        var handleDragStart = useCallback(function () {
            handleSelected(eleRef);
        }, [handleSelected]);
        var handleDragEnd = function (e) {
            var info = handleKonvaItem(e.target);
            handleInfo(info);
        };
        useEffect(function () {
            if (trRef) {
                var tr = trRef.current;
                if (isSelected && showTransformer) {
                    tr.show();
                    tr.forceUpdate();
                }
                else {
                    tr.hide();
                }
            }
        }, [isSelected, showTransformer, trRef]);
        var boundBoxFunc = function (oldBox, newBox) {
            if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
            }
            return newBox;
        };
        return (_jsxs(_Fragment, { children: [_jsx(Component, __assign({ onDragStart: handleDragStart, onDragEnd: handleDragEnd, shadowColor: "black", opacity: opacity, draggable: !banDrag, trRef: trRef, myRef: eleRef, setShowTransformer: setShowTransformer }, props, { handleSelected: handleDragStart })), _jsx(Transformer, { ref: trRef, boundBoxFunc: boundBoxFunc, resizeEnabled: !banDrag, rotateEnabled: !banDrag, onTransformEnd: function (a) {
                        handleInfo(handleKonvaItem(a.target));
                    } })] }));
    };
    return Inner;
};
export default withTransform;
