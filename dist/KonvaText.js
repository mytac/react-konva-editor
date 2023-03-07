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
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Text } from 'react-konva';
import { SelectChangeListener } from './utils/textHandler';
var KonvaText = function (_a) {
    var stageRef = _a.stageRef, myRef = _a.myRef, setShowTransformer = _a.setShowTransformer, handleSelected = _a.handleSelected, handleInfo = _a.handleInfo, onRef = _a.onRef, isNew = _a.isNew, stageScale = _a.stageScale, trRef = _a.trRef, props = __rest(_a, ["stageRef", "myRef", "setShowTransformer", "handleSelected", "handleInfo", "onRef", "isNew", "stageScale", "trRef"]);
    var _b = useState(true), showText = _b[0], setShowText = _b[1];
    var _c = useState({}), gradient = _c[0], setGradient = _c[1];
    var changeGardient = function (allWidth, a, b, total) {
        console.log('allWidth', allWidth);
        var targetColor = 'yellow';
        var originColor = props.color || '#000';
        var start = a >= b ? b : a;
        var end = a > b ? a : b;
        var split = [start / total, end / total];
        console.log('split', split);
        var obj = {
            fill: 'red',
            fillLinearGradientStartPoint: {
                x: 0,
                y: 0,
            },
            fillLinearGradientEndPoint: { x: allWidth, y: 0 },
            fillPatternRepeat: 'repeat-x',
            fillLinearGradientColorStops: [
                0,
                originColor,
                split[0],
                originColor,
                split[0],
                targetColor,
                split[1],
                targetColor,
                split[1],
                originColor,
                1,
                originColor,
            ],
        };
        console.log('obj', obj);
        setGradient(obj);
    };
    var onDblClick = function (e) {
        var _a;
        var textNode = myRef.current;
        var originalText = textNode.text();
        if (!textNode)
            return;
        var transformerBoxAttr = (_a = trRef.current.children) === null || _a === void 0 ? void 0 : _a[0].attrs;
        var stageBox = stageRef.current.container().getBoundingClientRect();
        var areaPosition = {
            x: stageBox.x + (props.x || 0) * stageScale,
            y: stageBox.y + (props.y || 0) * stageScale,
        };
        setShowText(false);
        var textarea = document.createElement('textarea');
        setShowTransformer(false);
        document.body.appendChild(textarea);
        textarea.value = originalText;
        var scaleX = textNode.attrs.scaleX || 1;
        var originFontSize = props.fontSize || 40;
        var transformedFontSize = originFontSize * scaleX * stageScale;
        textarea.style.position = 'fixed';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        var realWidth = transformerBoxAttr.width * stageScale - textNode.padding() * 2;
        var realHeight = transformerBoxAttr.height * stageScale - textNode.padding() * 2 + 'px';
        textarea.style.width = realWidth + 'px';
        textarea.style.height = realHeight;
        var selectChanger = new SelectChangeListener(textarea, originalText, changeGardient, realWidth);
        textarea.style.fontSize = transformedFontSize + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.zIndex = '100';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        var textAreaFontStyle = textNode.fontStyle();
        var textDecoration = textNode.textDecoration();
        if (textAreaFontStyle.includes('italic')) {
            textarea.style.fontStyle = 'italic';
        }
        if (textAreaFontStyle.includes('bold')) {
            textarea.style.fontWeight = 'bold';
        }
        if (textDecoration.includes('underline')) {
            textarea.style.textDecoration = 'underline';
        }
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        selectChanger.listen();
        var rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg) ';
        }
        var px = 0;
        var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px) ';
        textarea.style.transform = transform;
        textarea.focus();
        function removeTextarea() {
            try {
                if (textarea) {
                    document.body.removeChild(textarea);
                    setShowText(true);
                    selectChanger.destory();
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        function setTextareaWidth(newWidth) {
            try {
                if (!newWidth) {
                    newWidth = textNode.placeholder.length * transformedFontSize;
                }
                var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                var isFirefox_1 = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isSafari || isFirefox_1) {
                    newWidth = Math.ceil(newWidth);
                }
                var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
                if (isEdge) {
                    newWidth += 1;
                }
                textarea.style.width = newWidth + 'px';
            }
            catch (err) {
                console.log('err in konvatext', err);
            }
        }
        textarea.addEventListener('keydown', function (e) {
            if (setShowTransformer) {
                setShowTransformer(false);
            }
            if (e.keyCode === 27) {
                removeTextarea();
            }
            var scale = textNode.getAbsoluteScale().x;
            textNode.text(textarea.value);
            handleInfo({ value: textarea.value });
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + transformedFontSize + 'px';
            e.stopPropagation();
        });
        textarea.addEventListener('blur', function () {
            setShowTransformer(true);
            handleInfo({ value: textarea.value });
            removeTextarea();
        });
    };
    useEffect(function () {
        if (myRef && myRef.current) {
            var el = myRef.current;
            if (showText) {
                el.show();
            }
            else {
                el.hide();
            }
        }
    }, [myRef, showText]);
    useEffect(function () {
        if (onRef) {
            onRef(myRef);
        }
    }, []);
    useEffect(function () {
        handleInfo({ gradient: gradient });
    }, [gradient]);
    return (_jsx(_Fragment, { children: _jsx(Text, __assign({ text: props.value, ref: myRef, onDblClick: onDblClick, onClick: handleSelected, fontSize: 40 }, props, { fillAfterStrokeEnabled: true, value: undefined, lineJoin: "round" })) }));
};
export default KonvaText;
