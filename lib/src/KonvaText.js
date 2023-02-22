"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_konva_1 = require("react-konva");
const textHandler_1 = require("./utils/textHandler");
const KonvaText = ({ stageRef, myRef, setShowTransformer, handleSelected, handleInfo, onRef, isNew, stageScale, trRef, ...props }) => {
    const [showText, setShowText] = (0, react_1.useState)(true);
    const [gradient, setGradient] = (0, react_1.useState)({});
    const changeGardient = (allWidth, a, b, total) => {
        console.log('allWidth', allWidth);
        const targetColor = 'yellow';
        const originColor = props.color || '#000';
        const start = a >= b ? b : a;
        const end = a > b ? a : b;
        const split = [start / total, end / total];
        const obj = {
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
    const onDblClick = (e) => {
        const textNode = myRef.current;
        const originalText = textNode.text();
        if (!textNode)
            return;
        const transformerBoxAttr = trRef.current.children?.[0].attrs;
        const stageBox = stageRef.current.container().getBoundingClientRect();
        const areaPosition = {
            x: stageBox.x + (props.x || 0) * stageScale,
            y: stageBox.y + (props.y || 0) * stageScale,
        };
        setShowText(false);
        const textarea = document.createElement('textarea');
        setShowTransformer(false);
        document.body.appendChild(textarea);
        textarea.value = originalText;
        const scaleX = textNode.attrs.scaleX || 1;
        const originFontSize = props.fontSize || 40;
        const transformedFontSize = originFontSize * scaleX * stageScale;
        textarea.style.position = 'fixed';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        const realWidth = transformerBoxAttr.width * stageScale - textNode.padding() * 2;
        const realHeight = transformerBoxAttr.height * stageScale - textNode.padding() * 2 + 'px';
        textarea.style.width = realWidth + 'px';
        textarea.style.height = realHeight;
        const selectChanger = new textHandler_1.SelectChangeListener(textarea, originalText, changeGardient, realWidth);
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
        const textAreaFontStyle = textNode.fontStyle();
        const textDecoration = textNode.textDecoration();
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
        let rotation = textNode.rotation();
        let transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg) ';
        }
        let px = 0;
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
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
                const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isSafari || isFirefox) {
                    newWidth = Math.ceil(newWidth);
                }
                const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
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
            const scale = textNode.getAbsoluteScale().x;
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
    (0, react_1.useEffect)(() => {
        if (myRef && myRef.current) {
            const el = myRef.current;
            if (showText) {
                el.show();
            }
            else {
                el.hide();
            }
        }
    }, [myRef, showText]);
    (0, react_1.useEffect)(() => {
        if (onRef) {
            onRef(myRef);
        }
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_konva_1.Text, { text: props.value, ref: myRef, onDblClick: onDblClick, onClick: handleSelected, fontSize: 40, ...props, fillAfterStrokeEnabled: true, value: undefined, lineJoin: "round" }) }));
};
exports.default = KonvaText;
