function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["stageRef", "myRef", "setShowTransformer", "handleSelected", "handleInfo", "onRef", "isNew", "stageScale", "trRef"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useState, useEffect } from 'react';
import { Text } from 'react-konva';
import { SelectChangeListener } from "./utils/textHandler";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var KonvaText = function KonvaText(_ref) {
  var stageRef = _ref.stageRef,
    myRef = _ref.myRef,
    setShowTransformer = _ref.setShowTransformer,
    handleSelected = _ref.handleSelected,
    handleInfo = _ref.handleInfo,
    onRef = _ref.onRef,
    isNew = _ref.isNew,
    stageScale = _ref.stageScale,
    trRef = _ref.trRef,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    showText = _useState2[0],
    setShowText = _useState2[1];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    gradient = _useState4[0],
    setGradient = _useState4[1];
  var changeGardient = function changeGardient(allWidth, a, b, total) {
    console.log('allWidth', allWidth);
    // const EveryWidth = allWidth / total;
    var targetColor = 'yellow';
    var originColor = props.color || '#000';
    var start = a >= b ? b : a;
    var end = a > b ? a : b;
    var split = [start / total, end / total];
    var obj = {
      fill: 'red',
      // fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientStartPoint: {
        x: 0,
        // x: start * EveryWidth * stageScale,
        y: 0
      },
      // fillLinearGradientEndPoint: { x: end * EveryWidth * stageScale, y: 0 },
      fillLinearGradientEndPoint: {
        x: allWidth,
        y: 0
      },
      fillPatternRepeat: 'repeat-x',
      // fillLinearGradientEndPoint: { x: 100, y: 0 },
      fillLinearGradientColorStops: [0, originColor, split[0], originColor, split[0], targetColor, split[1], targetColor, split[1], originColor, 1, originColor]
    };
    console.log('obj', obj);
    setGradient(obj);
  };
  var onDblClick = function onDblClick(e) {
    var _trRef$current$childr;
    var textNode = myRef.current;
    var originalText = textNode.text();
    if (!textNode) return;
    var transformerBoxAttr = (_trRef$current$childr = trRef.current.children) === null || _trRef$current$childr === void 0 ? void 0 : _trRef$current$childr[0].attrs;
    var stageBox = stageRef.current.container().getBoundingClientRect();
    var areaPosition = {
      x: stageBox.x + (props.x || 0) * stageScale,
      y: stageBox.y + (props.y || 0) * stageScale
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
    //@ts-ignore
    textarea.style.fontSize = transformedFontSize + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    // textarea.style.whiteSpace = 'nowrap';

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
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += 'translateY(-' + px + 'px) ';
    textarea.style.transform = transform;
    // reset height
    // textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    // textarea.style.height = textarea.scrollHeight + 3 + 'px';

    textarea.focus();
    function removeTextarea() {
      try {
        if (textarea) {
          document.body.removeChild(textarea);
          setShowText(true);
          selectChanger.destory();
        }
      } catch (err) {
        console.log(err);
      }
    }
    function setTextareaWidth(newWidth) {
      try {
        if (!newWidth) {
          // set width for placeholder
          newWidth = textNode.placeholder.length * transformedFontSize;
        }
        // some extra fixes on different browsers
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var _isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || _isFirefox) {
          newWidth = Math.ceil(newWidth);
        }
        // @ts-ignore
        var isEdge =
        // @ts-ignore
        document.documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
          newWidth += 1;
        }
        textarea.style.width = newWidth + 'px';
      } catch (err) {
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
      handleInfo({
        value: textarea.value
      });
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + transformedFontSize + 'px';
      e.stopPropagation();
    });
    textarea.addEventListener('blur', function () {
      setShowTransformer(true);
      handleInfo({
        value: textarea.value
      });
      removeTextarea();
    });
  };
  useEffect(function () {
    if (myRef && myRef.current) {
      var el = myRef.current;
      if (showText) {
        el.show();
      } else {
        el.hide();
      }
    }
  }, [myRef, showText]);

  // 不知道产品要不要，先保留吧，产品与设计有argue，这段代码会造成文字闪现，从x=0，y=0，跳到当前位置，体验不好
  // useEffect(() => {
  //   if (isNew && stageRef && myRef) {
  //     // 如果是新增元素，需要将元素置于画布中央
  //     const stage = stageRef.current;
  //     const textNode = myRef.current;

  //     const stageW = stage.getWidth();
  //     const stageH = stage.getHeight();

  //     const textW = textNode.getWidth();
  //     const textH = textNode.getHeight();

  //     const areaPosition = {
  //       x: (stageW - textW) / 2,
  //       y: (stageH - textH) / 2,
  //     };

  //     handleInfo(areaPosition);
  //   }
  // }, [isNew, stageRef, myRef, handleInfo]);

  useEffect(function () {
    if (onRef) {
      onRef(myRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   handleInfo({ gradient });
  //   // eslint-dissable-next-line react-hooks/exhaustive-deps
  // }, [gradient]);

  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsx(Text, _objectSpread(_objectSpread({
      text: props.value,
      ref: myRef,
      onDblClick: onDblClick
      // @ts-ignore
      ,
      onClick: handleSelected,
      fontSize: 40
      // fill="#000"
    }, props), {}, {
      fillAfterStrokeEnabled: true
      // fillPriority="linear-gradient"
      // fill={Object.keys(gradient) ? undefined : '#000'}
      ,
      value: undefined,
      lineJoin: "round"
      // globalCompositeOperation="destination-in"
      // {...gradient}

      // fontStyle="italic bold" // "italic"
      // align="center"
      // x={0}
      // visible
    }))
  });
};

export default KonvaText;