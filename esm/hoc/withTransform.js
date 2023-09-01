function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Transformer } from 'react-konva';
import handleKonvaItem from "../utils/handleKonvaItem";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var withTransform = function withTransform(Component) {
  var Inner = function Inner(props) {
    var _props$isSelected = props.isSelected,
      isSelected = _props$isSelected === void 0 ? false : _props$isSelected,
      _props$handleInfo = props.handleInfo,
      handleInfo = _props$handleInfo === void 0 ? function () {} : _props$handleInfo,
      _props$opacity = props.opacity,
      opacity = _props$opacity === void 0 ? 1 : _props$opacity,
      handleSelected = props.handleSelected,
      banDrag = props.banDrag;
    var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      showTransformer = _useState2[0],
      setShowTransformer = _useState2[1];
    var eleRef = useRef(null);
    var trRef = useRef(null);
    useEffect(function () {
      var transformer = trRef.current;
      if (isSelected && eleRef !== null && eleRef !== void 0 && eleRef.current && transformer) {
        if ((props === null || props === void 0 ? void 0 : props.type) === 'text') {
          var _transformer$getLayer;
          // @ts-ignore
          transformer.nodes([eleRef.current]);
          (_transformer$getLayer = transformer.getLayer()) === null || _transformer$getLayer === void 0 ? void 0 : _transformer$getLayer.batchDraw();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected]);
    var handleDragStart = useCallback(function () {
      handleSelected(eleRef);
    }, [handleSelected]);
    var handleDragEnd = function handleDragEnd(e) {
      var info = handleKonvaItem(e.target);
      handleInfo(info);
    };
    useEffect(function () {
      if (trRef) {
        var tr = trRef.current;
        if (isSelected && showTransformer) {
          // @ts-ignore
          tr.show();
          // @ts-ignore
          tr.forceUpdate();
        } else {
          // @ts-ignore
          tr.hide();
        }
      }
    }, [isSelected, showTransformer, trRef]);
    var boundBoxFunc = function boundBoxFunc(oldBox, newBox) {
      if (newBox.width < 5 || newBox.height < 5) {
        return oldBox;
      }
      return newBox;
    };
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(Component, _objectSpread(_objectSpread({
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        shadowColor: "black"
        // shadowOffsetX={info.isDragging ? 10 : 5}
        // shadowOffsetY={info.isDragging ? 10 : 5}
        // scaleX={info.isDragging ? 1.2 : 1}
        // scaleY={info.isDragging ? 1.2 : 1}
        ,
        opacity: opacity,
        draggable: !banDrag,
        trRef: trRef,
        myRef: eleRef,
        setShowTransformer: setShowTransformer
      }, props), {}, {
        // @ts-ignore
        handleSelected: handleDragStart
      })), /*#__PURE__*/_jsx(Transformer, {
        ref: trRef,
        boundBoxFunc: boundBoxFunc,
        resizeEnabled: !banDrag,
        rotateEnabled: !banDrag,
        onTransformEnd: function onTransformEnd(a) {
          handleInfo(handleKonvaItem(a.target));
        }
      })]
    });
  };
  return Inner;
};
export default withTransform;