function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["stageRef", "myRef", "setShowTransformer", "handleSelected", "handleInfo", "onRef", "value", "banDrag", "trRef", "crop", "isNew", "isSelected", "_isAdaptStage", "_isProportionalScaling", "_isChangedCrop"];
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
import React, { useEffect } from 'react';
import { noop } from 'lodash';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { AdaptStrategy } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
var KonvaImage = function KonvaImage(_ref) {
  var stageRef = _ref.stageRef,
    myRef = _ref.myRef,
    setShowTransformer = _ref.setShowTransformer,
    handleSelected = _ref.handleSelected,
    handleInfo = _ref.handleInfo,
    onRef = _ref.onRef,
    value = _ref.value,
    banDrag = _ref.banDrag,
    trRef = _ref.trRef,
    crop = _ref.crop,
    isNew = _ref.isNew,
    isSelected = _ref.isSelected,
    _isAdaptStage = _ref._isAdaptStage,
    _isProportionalScaling = _ref._isProportionalScaling,
    _isChangedCrop = _ref._isChangedCrop,
    props = _objectWithoutProperties(_ref, _excluded);
  var _useImage = useImage(value, 'anonymous'),
    _useImage2 = _slicedToArray(_useImage, 1),
    image /* status */ = _useImage2[0];
  useEffect(function () {
    if (image && (isNew || _isChangedCrop) && _isAdaptStage && stageRef) {
      // 先适配舞台
      // 如果有crop x、y保持原图比例，crop的width和height为适配后的
      var item = AdaptStrategy.adaptNewImage(_isChangedCrop ? crop : image, stageRef.current);
      if (item) {
        var width = item.width,
          height = item.height;
        if (_isChangedCrop && width && height) {
          // @ts-ignore
          // item.crop = { ...cropXY, width, height };
          item.crop = _objectSpread({}, crop);
        }
        handleInfo(_objectSpread(_objectSpread({}, item), {}, {
          width: Number(width),
          height: Number(height),
          scaleX: 1,
          scaleY: 1,
          _isChangedCrop: false,
          _isAdaptStage: false,
          _isProportionalScaling: false
        }));
        trRef.current.nodes([myRef.current]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, _isAdaptStage, image, stageRef, trRef, myRef]);
  useEffect(function () {
    if (onRef) {
      onRef(myRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRef]);
  useEffect(function () {
    var prevLayer = trRef === null || trRef === void 0 ? void 0 : trRef.current;
    var height = props.height,
      width = props.width,
      _props$scaleX = props.scaleX,
      scaleX = _props$scaleX === void 0 ? 1 : _props$scaleX,
      _props$scaleY = props.scaleY,
      scaleY = _props$scaleY === void 0 ? 1 : _props$scaleY;
    var prevW = prevLayer.getWidth();
    var prevH = prevLayer.getHeight();
    var oldSize;
    if (width && height) {
      // console.log('use 2', width, height);
      oldSize = {
        width: width * scaleX,
        height: height * scaleY
      };
    } else if (!isNaN(prevW)) {
      // console.log('use 1', prevW, prevH);

      oldSize = {
        width: prevW,
        height: prevH
      };
    } else return;
    // console.log('oldSize', oldSize);

    // 直接替换，等比缩放
    if (isSelected && _isProportionalScaling && oldSize) {
      var _myRef$current, _myRef$current$attrs;
      /// adapt image-replacement
      var _isP =
      // 是否等比缩放
      (myRef === null || myRef === void 0 ? void 0 : (_myRef$current = myRef.current) === null || _myRef$current === void 0 ? void 0 : (_myRef$current$attrs = _myRef$current.attrs) === null || _myRef$current$attrs === void 0 ? void 0 : _myRef$current$attrs._isProportionalScaling) || _isProportionalScaling;
      if (_isP && image && oldSize) {
        // 替换模式
        var item = AdaptStrategy.adaptReplaceImage(image, oldSize);
        if (item) {
          handleInfo(_objectSpread(_objectSpread({}, item), {}, {
            scaleX: 1,
            scaleY: 1,
            _isProportionalScaling: 0
          }));
        }
      }
      trRef.current.nodes([myRef.current]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, myRef, isNew, trRef.current, isSelected, _isProportionalScaling, props.width, props.height]);
  useEffect(function () {
    if (trRef && trRef.current) {
      trRef.current.nodes([myRef.current]);
    }
  }, [image, trRef, myRef]);
  var commonParams = {};
  if (crop) {
    commonParams.crop = crop;
  }
  return /*#__PURE__*/_jsx(Image, _objectSpread(_objectSpread({
    image: image,
    ref: myRef,
    onClick: banDrag ? noop : handleSelected
    // @ts-ignore
    ,
    id: String(props.id)
  }, commonParams), props));
};
export default KonvaImage;