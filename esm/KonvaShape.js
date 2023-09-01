function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["stageRef", "myRef", "setShowTransformer", "handleSelected", "handleInfo", "onRef", "banDrag", "trRef", "isSelected", "fill", "value", "id", "width", "height"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useEffect } from 'react';
import { noop } from 'lodash';
import { Rect, Circle, Arc, Star, Arrow, Ellipse } from 'react-konva';
import { jsx as _jsx } from "react/jsx-runtime";
var KonvaShape = function KonvaShape(_ref) {
  var stageRef = _ref.stageRef,
    myRef = _ref.myRef,
    setShowTransformer = _ref.setShowTransformer,
    handleSelected = _ref.handleSelected,
    handleInfo = _ref.handleInfo,
    onRef = _ref.onRef,
    banDrag = _ref.banDrag,
    trRef = _ref.trRef,
    isSelected = _ref.isSelected,
    fill = _ref.fill,
    value = _ref.value,
    id = _ref.id,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? 100 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 30 : _ref$height,
    props = _objectWithoutProperties(_ref, _excluded);
  // 选中态，显示transformer
  useEffect(function () {
    if (isSelected && trRef !== null && trRef !== void 0 && trRef.current) {
      trRef.current.nodes([myRef.current]);
    }
  }, [isSelected, trRef, myRef]);
  var commonProps = _objectSpread({
    key: String(id),
    id: String(id),
    ref: myRef,
    onClick: banDrag ? noop : handleSelected
  }, props);
  if (value === 'rect') {
    return (
      /*#__PURE__*/
      //@ts-ignore
      _jsx(Rect, _objectSpread({
        fill: fill,
        width: width,
        height: height
      }, commonProps))
    );
  }
  if (value === 'circle') {
    var radius = props.radius;
    return /*#__PURE__*/_jsx(Circle, _objectSpread({
      fill: fill,
      radius: radius
    }, commonProps));
  }
  if (value === 'arc') {
    var _props$innerRadius = props.innerRadius,
      innerRadius = _props$innerRadius === void 0 ? 100 : _props$innerRadius,
      _props$outerRadius = props.outerRadius,
      outerRadius = _props$outerRadius === void 0 ? 60 : _props$outerRadius,
      _props$angle = props.angle,
      angle = _props$angle === void 0 ? 180 : _props$angle;
    return /*#__PURE__*/_jsx(Arc, _objectSpread({
      fill: fill,
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      angle: angle
    }, commonProps));
  }
  if (value === 'star') {
    var _props$innerRadius2 = props.innerRadius,
      _innerRadius = _props$innerRadius2 === void 0 ? 50 : _props$innerRadius2,
      _props$outerRadius2 = props.outerRadius,
      _outerRadius = _props$outerRadius2 === void 0 ? 100 : _props$outerRadius2,
      _props$numPoints = props.numPoints,
      numPoints = _props$numPoints === void 0 ? 5 : _props$numPoints;
    return /*#__PURE__*/_jsx(Star, _objectSpread({
      fill: fill,
      numPoints: numPoints,
      innerRadius: _innerRadius,
      outerRadius: _outerRadius
    }, commonProps));
  }
  if (value === 'arrow') {
    var _props$points = props.points,
      points = _props$points === void 0 ? [0, 0, 50, 50] : _props$points;
    return /*#__PURE__*/_jsx(Arrow, _objectSpread({
      stroke: fill,
      fill: fill,
      points: points,
      pointerLength: 10,
      pointerWidth: 20
    }, commonProps));
  }
  if (value === 'ellipse') {
    var _props$ellipseRadius = props.ellipseRadius,
      ellipseRadius = _props$ellipseRadius === void 0 ? {
        radiusX: 40,
        radiusY: 20
      } : _props$ellipseRadius;
    return /*#__PURE__*/_jsx(Ellipse, _objectSpread(_objectSpread({}, ellipseRadius), {}, {
      fill: fill
    }, commonProps));
  }
  return null;
};
export default KonvaShape;