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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { noop } from 'lodash';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { AdaptStrategy } from './utils';
import usePrevious from './hooks/usePrevious';
var KonvaImage = function (_a) {
    var stageRef = _a.stageRef, myRef = _a.myRef, setShowTransformer = _a.setShowTransformer, handleSelected = _a.handleSelected, handleInfo = _a.handleInfo, onRef = _a.onRef, value = _a.value, banDrag = _a.banDrag, trRef = _a.trRef, isNew = _a.isNew, isSelected = _a.isSelected, _isAdaptStage = _a._isAdaptStage, _isProportionalScaling = _a._isProportionalScaling, props = __rest(_a, ["stageRef", "myRef", "setShowTransformer", "handleSelected", "handleInfo", "onRef", "value", "banDrag", "trRef", "isNew", "isSelected", "_isAdaptStage", "_isProportionalScaling"]);
    var _b = useState(null), oldSize = _b[0], setOldSize = _b[1];
    var image = useImage(value, 'anonymous')[0];
    var prevMarkerRef = usePrevious(myRef);
    useEffect(function () {
        if (onRef) {
            onRef(myRef);
        }
    }, [myRef]);
    useEffect(function () {
        var _a, _b;
        if (isSelected && (_isProportionalScaling || !isNew)) {
            var _isP = ((_b = (_a = myRef === null || myRef === void 0 ? void 0 : myRef.current) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b._isProportionalScaling) || _isProportionalScaling;
            if (_isP && image && oldSize) {
                var item = AdaptStrategy.adaptReplaceImage(image, oldSize);
                if (item) {
                    handleInfo(__assign(__assign({}, item), { scaleX: 1, scaleY: 1 }));
                }
            }
            trRef.current.nodes([myRef.current]);
        }
    }, [image, myRef, isNew, trRef.current, isSelected, _isProportionalScaling]);
    useEffect(function () {
        if (isSelected) {
            if (prevMarkerRef && prevMarkerRef.current) {
                var prevLayer = prevMarkerRef.current;
                var width = prevLayer.getWidth();
                var height = prevLayer.getHeight();
                var scaleX = prevLayer.attrs.scaleX;
                var scaleY = prevLayer.attrs.scaleY;
                setOldSize({ width: width * scaleX, height: scaleY * height });
            }
        }
        else {
            setOldSize(null);
        }
    }, [isSelected, prevMarkerRef]);
    useEffect(function () {
        if (image && stageRef && stageRef.current && isNew && _isAdaptStage) {
            var item = AdaptStrategy.adaptNewImage(image, stageRef.current);
            if (item) {
                handleInfo(__assign(__assign({}, item), { scaleX: 1, scaleY: 1 }));
                trRef.current.nodes([myRef.current]);
            }
        }
    }, [image, stageRef, isNew, trRef, _isAdaptStage]);
    useEffect(function () {
        if (!image || !trRef || !isNew || !myRef) {
            return;
        }
        if (trRef && trRef.current) {
            trRef.current.nodes([myRef.current]);
        }
    }, [image, trRef, isNew, myRef]);
    var size = props.width && props.height
        ? {
            width: Number(props.width),
            height: Number(props.height),
        }
        : {};
    return (_jsx(Image, __assign({ image: image, ref: myRef, onClick: banDrag ? noop : handleSelected }, props, size, { id: String(props.id) })));
};
export default KonvaImage;
