function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
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
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import withTransform from "./hoc/withTransform";
import MyImage from "./KonvaImg";
import MyText from "./KonvaText";
import MyShape from "./KonvaShape";
import MyGroup from "./KonvaGroup";
import { handleDuplicateId, downloadURI, isSelectedId } from "./utils/utils";
import circularQueue from "./utils/circularQueue";
import KeyboardListener from "./keyboardListener";
import { isArray, isNumber } from 'lodash';
// @ts-ignore
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var KonvaGroup = withTransform(MyGroup);
// @ts-ignore
var KonvaImage = withTransform(MyImage);
// @ts-ignore
var KonvaText = withTransform(MyText);
// @ts-ignore
var KonvaShape = withTransform(MyShape);
var hotkeyListener = new KeyboardListener();
var stepCached;
var outerInstance = {
  value: {},
  attach: function attach(k, v) {
    this.value[k] = v;
  },
  clean: function clean() {
    this.value = {};
  }
};
var Core = function Core(_ref) {
  var width = _ref.width,
    height = _ref.height,
    _ref$backgroundColor = _ref.backgroundColor,
    backgroundColor = _ref$backgroundColor === void 0 ? '#fff' : _ref$backgroundColor,
    _ref$backgroundStyle = _ref.backgroundStyle,
    backgroundStyle = _ref$backgroundStyle === void 0 ? {} : _ref$backgroundStyle,
    addItem = _ref.addItem,
    selectedItemChange = _ref.selectedItemChange,
    _ref$maxStep = _ref.maxStep,
    maxStep = _ref$maxStep === void 0 ? 10 : _ref$maxStep,
    _ref$setRedo = _ref.setRedo,
    setRedo = _ref$setRedo === void 0 ? function () {} : _ref$setRedo,
    _ref$setWithdraw = _ref.setWithdraw,
    setWithdraw = _ref$setWithdraw === void 0 ? function () {} : _ref$setWithdraw,
    _ref$onChangeSelected = _ref.onChangeSelected,
    onChangeSelected = _ref$onChangeSelected === void 0 ? function () {} : _ref$onChangeSelected,
    _ref$bindRef = _ref.bindRef,
    bindRef = _ref$bindRef === void 0 ? function () {} : _ref$bindRef,
    _ref$stepInfo = _ref.stepInfo,
    stepInfo = _ref$stepInfo === void 0 ? [] : _ref$stepInfo,
    _ref$onChangeStep = _ref.onChangeStep,
    onChangeStep = _ref$onChangeStep === void 0 ? function () {} : _ref$onChangeStep;
  var stageRef = useRef(null);
  var outRef = useRef(null);
  var _useState = useState(-2),
    _useState2 = _slicedToArray(_useState, 2),
    newId = _useState2[0],
    setNewId = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedId = _useState4[0],
    setSelected = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    steps = _useState6[0],
    setSteps = _useState6[1];
  var _useState7 = useState(0.7),
    _useState8 = _slicedToArray(_useState7, 2),
    stageScale = _useState8[0],
    setStageScale = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    multiSelected = _useState10[0],
    setMultiSelected = _useState10[1];

  // 添加新元素时
  var onAdd = function onAdd(item) {
    if (stepCached) {
      var currentItem = stepCached.getCurrent();
      if (currentItem) {
        var infos = currentItem;
        var newItem = _objectSpread(_objectSpread({}, item), {}, {
          id: 0
        });
        var maxId = infos.reduce(function (prev, info) {
          return isNumber(info.id) ? Math.max(Number(info.id), prev) : prev + 100;
        }, 0);
        var _newId = isNaN(maxId) || !maxId ? new Date().getTime() : maxId + 1;
        setNewId(_newId);
        setSelected(_newId);
        newItem.id = _newId;
        var list = [].concat(_toConsumableArray(infos), [newItem]);
        stepCached.enqueue(list);
        var currentInfo = stepCached.getCurrent();
        setSteps(currentInfo);
      }
    }
  };

  // 当元素进行改变时
  var handleInfo = function handleInfo(index, item) {
    if (stepCached) {
      var infos = stepCached.getCurrent();
      var current = stepCached.getCurrent()[index];
      var newInfo = _objectSpread(_objectSpread({}, current), item);
      var ins = _toConsumableArray(infos);
      ins[index] = newInfo;
      stepCached.enqueue(ins);
      setSteps(stepCached.getCurrent());
    }
  };
  useEffect(function () {
    if (addItem) {
      onAdd(addItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItem]);
  useEffect(function () {
    if (
    // 当改变选择元素的参数
    selectedItemChange && Object.keys(selectedItemChange).length && selectedId) {
      handleSelectItem(function (item) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        if (item && item.type === 'stage') {
          return;
        }
        // 当改变的为item时，更新图层信息

        if (stepCached) {
          var infos = stepCached.getCurrent();
          if (Array.isArray(selectedItemChange)) {
            // 多选图层批量更新属性
            // 多选图层
            var needUpdateLayers = _toConsumableArray(selectedItemChange);
            var _infos = _toConsumableArray(stepCached.getCurrent());
            var _loop = function _loop(i) {
              var index = _infos.findIndex(function (layer) {
                var _needUpdateLayers$i;
                return layer.id === ((_needUpdateLayers$i = needUpdateLayers[i]) === null || _needUpdateLayers$i === void 0 ? void 0 : _needUpdateLayers$i.id);
              });
              _infos[index] = needUpdateLayers[i];
            };
            for (var i = 0; i < needUpdateLayers.length; i++) {
              _loop(i);
            }
            stepCached.enqueue(_infos);
          } else {
            // 单选图层，改变属性
            var properties = _objectSpread(_objectSpread({}, item), selectedItemChange);
            if (properties._ignore === true) {
              // 不入队，替换当前指针所指元素，并清空current之后的队内元素
              delete properties._ignore;
              var ins = _toConsumableArray(infos);
              ins[index] = properties;
              //@ts-ignore
              stepCached.list[stepCached.current] = ins;
              stepCached.clearAfterCurrent();
              stepCached.enqueue(ins);
            } else {
              var newInfos = _toConsumableArray(infos);
              newInfos[index] = properties;
              stepCached.enqueue(newInfos);
            }
          }
          var newSteps = stepCached.getCurrent();
          console.log('newSteps', newSteps);
          setSteps(newSteps);
          // bindRef(ref)
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemChange]); // 更改选中元素的属性

  var handleSelectItem = useCallback(function () {
    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (a) {};
    if (selectedId === -1) {
      // stage
      var item = {
        type: 'stage'
      };
      cb(item);
    } else if (Array.isArray(selectedId)) {
      // 多选形态
      var indexes = [];
      var items = [];
      for (var i = 0; i < steps.length; i += 1) {
        if (selectedId.includes(steps[i].id)) {
          indexes.push(steps[i].id);
          items.push(steps[i]);
        }
      }
      cb(items);
    } else {
      if (Array.isArray(steps)) {
        var idx = steps.findIndex(function (i) {
          return (i === null || i === void 0 ? void 0 : i.id) === selectedId;
        });
        if (idx > -1) {
          var _item = steps[idx];
          cb(_item, idx);
        }
      } else {
        cb(undefined);
      }
    }
  }, [selectedId, steps]);
  var onRef = useCallback(function (ref) {
    if (ref) {
      handleSelectItem(function (item) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        if (item && item.type === 'stage') {
          return;
        }
        var ele = ref.current;
        // const initInfo = handleKonvaItem(ele);
        // const newInfo = { ...item, ...initInfo };
        // const newStep = [...steps];
        // newStep[newStep.length - 1] = newInfo;
        // setSteps(newStep);
        // @ts-ignore
        // stepCached.list[stepCached.current] = newStep;
        bindRef(ele); // 把当前选定的元素的ref传给上层
      });
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [bindRef, handleSelectItem, steps]);
  useEffect(function () {
    if (!(stepCached instanceof circularQueue)) {
      // 初始化
      stepCached = new circularQueue(maxStep);
      if (stepInfo !== null && stepInfo !== void 0 && stepInfo.length) {
        //@ts-ignore
        stepCached.list[0] = handleDuplicateId(stepInfo);
      }
      setSteps(stepCached.getCurrent());
      setWithdraw(false);
      setRedo(false);
    } else {
      if (stepInfo && stepInfo.length) {
        //@ts-ignore
        stepCached.list[stepCached.current] = handleDuplicateId(stepInfo);
        var res = stepCached.getCurrent();
        setSteps(res);
        setWithdraw(false);
        setRedo(false);
      }
    }
    // window.addEventListener('keypress', dragListener);
    return function () {
      // window.removeEventListener('keypress', dragListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepInfo]);
  useEffect(function () {
    var current = outRef.current;
    hotkeyListener.init(Core);
    hotkeyListener.listening(current);
    return function () {
      stepCached = undefined;
      hotkeyListener.destory(current);
    };
  }, []);
  useEffect(function () {
    if (stepCached) {
      setRedo(stepCached.canMoveForward);
      setWithdraw(stepCached.canMoveBack);
      handleSelectItem(function (item) {
        if (Array.isArray(item) || item && item.type !== 'stage') {
          onChangeSelected(item);
        }
      });
    }
    onChangeStep(steps);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);
  useEffect(function () {
    handleSelectItem(function (item) {
      if (item) {
        onChangeSelected(item);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);
  var onClickStage = function onClickStage(e) {
    setSelected(-1);
  };
  var handleSelected = function handleSelected(id, ref) {
    if (multiSelected) {
      // 多选
      if (isArray(selectedId)) {
        // 已开启多选模式下的 selectedId
        setSelected([].concat(_toConsumableArray(selectedId), [id]));
      } else {
        setSelected([selectedId, id]);
      }
    } else {
      setSelected(id);
    }
    if (ref && ref.current) {
      bindRef(ref.current);
    }
  };
  var copyItem = useCallback(function () {
    handleSelectItem(function (item) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (Array.isArray(item)) {
        console.warn('暂不支持多选复制');
        return;
      }
      if (item && item.type === 'stage') {
        return;
      }
      var coordinate = {
        x: 0,
        y: 0
      };
      var _item$x = item.x,
        x = _item$x === void 0 ? 0 : _item$x,
        _item$y = item.y,
        y = _item$y === void 0 ? 0 : _item$y;
      coordinate = {
        x: x + 10,
        y: y + 10
      };
      var copyItem = _objectSpread(_objectSpread(_objectSpread({}, item), coordinate), {}, {
        banDrag: 0,
        _isAdaptStage: 0
      });
      onAdd(copyItem);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, steps]);
  var deleteItem = useCallback(function () {
    handleSelectItem(function (item) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      if (item) {
        if (Array.isArray(item)) {
          console.warn('暂不支持多选删除');
          return;
        }
        var info = _toConsumableArray(steps);
        if (index > -1 && stepCached && !item.banDrag) {
          info.splice(index, 1);
          stepCached.enqueue(info);
          setSteps(stepCached.getCurrent());
          setSelected(-1); // 删除一个就指向舞台
          onChangeSelected({});
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, steps]);

  // 上下左右微调图层
  var moveLayer = useCallback(function (direction, delta) {
    if (!direction || !delta) {
      return;
    }
    var current = _toConsumableArray(steps);
    var isChanged = false;
    handleSelectItem(function (item) {
      var currentLayerIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      if (item && item.type === 'stage') {
        return;
      }
      if (Array.isArray(item)) {
        console.warn('暂不支持多选移动');
        return;
      }
      if (currentLayerIndex >= 0) {
        var info = current[currentLayerIndex];
        var oldValue = info[direction] || 0;
        var patch = _defineProperty({}, direction, oldValue + delta);
        current[currentLayerIndex] = _objectSpread(_objectSpread({}, info), patch);
        isChanged = true;
      }
      if (isChanged && stepCached) {
        stepCached.enqueue(current);
        setSteps(stepCached.getCurrent());
      }
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [selectedId, steps]);

  // 全量更新
  // const updateAllLayers = (newLayers:Array<Iinfo>) => {
  //   setSteps(newLayers)
  // }

  // 移动图层层级
  var moveLayerLevel = useCallback(function (i) {
    var current = _toConsumableArray(steps);
    var isChanged = false;
    handleSelectItem(function (item) {
      var currentLayerIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      if (item && item.type === 'stage') {
        return;
      }
      if (Array.isArray(item)) {
        console.warn('暂不支持多选移动');
        return;
      }
      if (currentLayerIndex >= 0) {
        var tmp = item;
        if (i > 0) {
          if (currentLayerIndex < current.length - 1) {
            current[currentLayerIndex] = current[currentLayerIndex + 1];
            current[currentLayerIndex + 1] = tmp;
            isChanged = true;
          }
        } else if (i < 0) {
          if (currentLayerIndex > 0) {
            current[currentLayerIndex] = current[currentLayerIndex - 1];
            current[currentLayerIndex - 1] = tmp;
            isChanged = true;
          }
        }
      }
      if (isChanged && stepCached) {
        stepCached.enqueue(current);
        setSteps(stepCached.getCurrent());
      }
    });
  }, [handleSelectItem, steps]);

  // 成组
  var madeGroup = useCallback(function (layers) {
    var infos = _toConsumableArray(steps);
    if (Array.isArray(layers) && stepCached) {
      // 拿到最大索引，最终group所属层级为最高层
      var maxIndex = layers.reduce(function (cur, _, index) {
        return Math.max(cur, index);
      }, 0);
      var info = stepCached.getCurrent();
      // 最大组号
      var maxGroupIndex = info.filter(function (info) {
        return info.type === 'group' && info.elementName;
      });
      var _newId2 = new Date().getTime();
      // 删除索引
      var group = {
        type: 'group',
        elements: _toConsumableArray(layers),
        id: _newId2,
        elementName: '组' + (maxGroupIndex.length + 1)
      };
      infos.splice(maxIndex + 1, 0, group);
      // 删除原图层
      layers.forEach(function (layer) {
        var id = layer.id;
        var index = infos.findIndex(function (oldLayer) {
          return oldLayer.id === id;
        });
        if (~index) {
          infos.splice(index, 1);
        }
      });
      stepCached.enqueue(infos);
      setSteps(stepCached.getCurrent());
      setSelected(_newId2);
      console.log('stepCached.getCurrent()', stepCached.getCurrent());
    }
  }, [steps]);

  // 拆组
  var divideGroup = useCallback(function (groupId) {
    if (stepCached) {
      var infos = _toConsumableArray(steps);
      var index = infos.findIndex(function (layer) {
        return layer.id === groupId;
      });
      if (~index) {
        var _group$elements;
        var group = infos[index];
        if (group !== null && group !== void 0 && (_group$elements = group.elements) !== null && _group$elements !== void 0 && _group$elements.length) {
          var elements = group.elements;
          infos.splice.apply(infos, [index, 1].concat(_toConsumableArray(elements)));
          stepCached.enqueue(infos);
          setSteps(stepCached.getCurrent());
          setSelected(elements[0].id);
          console.log('stepCached.getCurrent()', stepCached.getCurrent());
        }
      }
    }
  }, [steps]);
  useEffect(function () {
    outerInstance.attach('stageRef', stageRef);
    outerInstance.attach('setSelected', setSelected);
    outerInstance.attach('setStageScale', setStageScale);
    outerInstance.attach('setSteps', setSteps);
    outerInstance.attach('toggleMultiSelected', setMultiSelected);
  }, []);
  useEffect(function () {
    outerInstance.attach('deleteItem', deleteItem);
  }, [deleteItem]);
  useEffect(function () {
    outerInstance.attach('copyItem', copyItem);
  }, [copyItem]);
  useEffect(function () {
    outerInstance.attach('moveLayerLevel', moveLayerLevel);
  }, [moveLayerLevel]);
  useEffect(function () {
    outerInstance.attach('madeGroup', madeGroup);
  }, [madeGroup]);
  useEffect(function () {
    outerInstance.attach('divideGroup', divideGroup);
  }, [divideGroup]);
  useEffect(function () {
    outerInstance.attach('moveLayer', moveLayer);
  }, [moveLayer]);
  var renderGroup = function renderGroup(info, idx) {
    var inGroup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var type = info.type;
    if (type === 'group' && info.elements) {
      return (
        /*#__PURE__*/
        // @ts-ignore
        _jsx(KonvaGroup, {
          type: "group",
          banDrag: false,
          onRef: onRef,
          stageRef: stageRef,
          isSelected: isSelectedId(selectedId, info.id),
          handleInfo: handleInfo.bind(null, idx),
          handleSelected: handleSelected.bind(null, info.id),
          id: String(info.id),
          children: info === null || info === void 0 ? void 0 : info.elements.map(function (i, iidx) {
            return renderGroup(i, idx, true);
          })
        }, info.id)
      );
    }
    if (type === 'image') {
      return /*#__PURE__*/_jsx(KonvaImage, _objectSpread(_objectSpread({
        banDrag: inGroup ? true : undefined
      }, info), {}, {
        // @ts-ignore
        value: info.value,
        isNew: newId === info.id,
        onRef: onRef,
        stageRef: stageRef,
        isSelected: isSelectedId(selectedId, info.id),
        handleInfo: handleInfo.bind(null, idx),
        handleSelected: handleSelected.bind(null, info.id),
        id: String(info.id)
      }), info.id);
    }
    if (type === 'text') {
      return /*#__PURE__*/_jsx(KonvaText, _objectSpread(_objectSpread({
        banDrag: inGroup ? true : undefined
      }, info), {}, {
        //@ts-ignore
        stageRef: stageRef,
        onRef: onRef,
        isNew: newId === info.id,
        isSelected: isSelectedId(selectedId, info.id),
        handleInfo: handleInfo.bind(null, idx),
        handleSelected: handleSelected.bind(null, info.id),
        stageScale: stageScale,
        id: String(info.id)
      }), info.id);
    }
    if (type === 'shape') {
      return /*#__PURE__*/_jsx(KonvaShape, _objectSpread(_objectSpread({
        banDrag: inGroup ? true : undefined
      }, info), {}, {
        //@ts-ignore
        stageRef: stageRef,
        onRef: onRef,
        isNew: newId === info.id,
        isSelected: isSelectedId(selectedId, info.id),
        handleInfo: handleInfo.bind(null, idx),
        handleSelected: handleSelected.bind(null, info.id),
        stageScale: stageScale,
        id: String(info.id)
      }), info.id);
    }
    return null;
  };
  return /*#__PURE__*/_jsx("div", {
    style: _objectSpread(_objectSpread({}, backgroundStyle), {}, {
      transform: "scale(".concat(stageScale, ")")
    }),
    className: "taki-canvas",
    ref: outRef,
    tabIndex: 0,
    children: /*#__PURE__*/_jsxs(Stage, {
      width: width,
      height: height,
      ref: stageRef
      // onClick={setSelected.bind(null, 0)}
      ,
      children: [/*#__PURE__*/_jsx(Layer, {
        children: /*#__PURE__*/_jsx(Rect, {
          width: width,
          height: height,
          x: 0,
          y: 0,
          onClick: onClickStage,
          fill: backgroundColor
        })
      }, -1), /*#__PURE__*/_jsx(Layer, {
        children: steps && steps.map(function (info, idx) {
          return info ? info.type === 'group' ?
          /*#__PURE__*/
          // @ts-ignore
          _jsx(KonvaGroup, {
            type: "group",
            banDrag: false,
            onRef: onRef,
            stageRef: stageRef,
            isSelected: isSelectedId(selectedId, info.id),
            handleInfo: handleInfo.bind(null, idx),
            handleSelected: handleSelected.bind(null, info.id),
            id: String(info.id),
            children: info.elements.map(function (i, iidx) {
              return renderGroup(i, idx, true);
            })
          }, info.id) : renderGroup(info, idx) : null;
        })
      }, "content")]
    })
  });
};

// 输出并下载图片
Core.exportToImage = function () {
  var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'stage.jpg';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    scale: 1,
    quality: 1
  };
  var _options$scale = options.scale,
    scale = _options$scale === void 0 ? 1 : _options$scale,
    _options$quality = options.quality,
    quality = _options$quality === void 0 ? 1 : _options$quality,
    _options$fileType = options.fileType,
    fileType = _options$fileType === void 0 ? 'image/png' : _options$fileType;
  // 先把Transformer去掉
  var _outerInstance$value = outerInstance.value,
    stageRef = _outerInstance$value.stageRef,
    setSelected = _outerInstance$value.setSelected;
  setSelected(0);
  setTimeout(function () {
    try {
      if (stageRef && stageRef.current) {
        var _fileType$split = fileType.split('/'),
          _fileType$split2 = _slicedToArray(_fileType$split, 2),
          ext = _fileType$split2[1];
        var FileName = filename + '.' + ext;
        var uri = stageRef.current.toDataURL({
          pixelRatio: scale,
          quality: quality,
          mimeType: fileType
        });
        downloadURI(uri, FileName);
      }
    } catch (err) {
      console.log('err in exportToImage', err);
    }
  }, 100);
};

// 输出base64
Core.exportToBASE64 = function () {
  var _outerInstance$value2 = outerInstance.value,
    stageRef = _outerInstance$value2.stageRef,
    setSelected = _outerInstance$value2.setSelected;
  // 先把Transformer去掉
  setSelected(0);
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (stageRef && stageRef.current) {
        var b64 = stageRef.current.toDataURL();
        resolve(b64);
      } else {
        reject();
      }
    }, 1000);
  });
};

// 输出文件类型
Core.exportToFile = function () {
  var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'png';
  var fileName = arguments.length > 1 ? arguments[1] : undefined;
  var _outerInstance$value3 = outerInstance.value,
    stageRef = _outerInstance$value3.stageRef,
    setSelected = _outerInstance$value3.setSelected;
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(',');
    if (arr[0]) {
      var reg = /:(.*?);/;
      var regString = arr[0].match(reg);
      if (regString) {
        var mime = regString[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {
          type: mime
        });
      }
    }
  }
  if (stageRef && stageRef.current) {
    // 先把Transformer去掉
    setSelected(-1);
    var b64 = stageRef.current.toDataURL();
    return dataURLtoFile(b64, fileName + '.' + format);
  }
};

// 撤销
Core.withdraw = function () {
  var setSteps = outerInstance.value.setSteps;
  if (stepCached && stepCached.canMoveBack) {
    stepCached.moveBack();
    var curr = stepCached.getCurrent();
    setSteps(curr);
  }
};

// 重做
Core.redo = function () {
  var setSteps = outerInstance.value.setSteps;
  if (stepCached && stepCached.canMoveForward) {
    stepCached.moveForward();
    setSteps(stepCached.getCurrent());
  }
};

// 画布缩放
Core.canvasScale = function (ratio) {
  var setStageScale = outerInstance.value.setStageScale;
  // ratio属于[0.25,2]
  if (ratio <= 2.75 && ratio > 0) {
    setStageScale(ratio);
  }
};

// 删除选中元素
Core.deleteItem = function () {
  var deleteItem = outerInstance.value.deleteItem;
  deleteItem();
};

// 复制图层
Core.copyItem = function () {
  var copyItem = outerInstance.value.copyItem;
  copyItem();
};

// 获取当前画布信息
Core.getInfo = function () {
  if (stepCached) {
    /* Removing some private properties of the step information
      (especially _ignore,_isProportionalScaling etc.)
       to reduce redundant data.
    */
    var unHandledInfos = stepCached.getCurrent();
    var result = unHandledInfos.map(function (info) {
      var res = _objectSpread({}, info);
      // 删除私有字段
      delete res._isProportionalScaling;
      delete res._ignore;
      delete res._isAdaptStage;
      delete res._isChangedCrop;
      return res;
    });
    return result;
  }
};

// i正数往上移动，负数往下移动
Core.moveLayerLevel = function (i) {
  var moveLayerLevel = outerInstance.value.moveLayerLevel;
  moveLayerLevel(i);
};

// 将图层向四个方向移动像素
Core.moveLayer = function (direction, delta) {
  var moveLayer = outerInstance.value.moveLayer;
  moveLayer(direction, delta);
};

// 清空选项
Core.clearSelected = function () {
  var setSelected = outerInstance.value.setSelected;
  setSelected(-1);
};

// 设置选中图层
Core.setSelectedIndex = function (id) {
  var setSelected = outerInstance.value.setSelected;
  setSelected(id);
};

// 多选图层开关
Core.toggleMultiSelected = function (state) {
  var toggleMultiSelected = outerInstance.value.toggleMultiSelected;
  toggleMultiSelected(state);
};

// 锁定/解锁某个图层
Core.toogleLock = function (id) {
  var setSteps = outerInstance.value.setSteps;
  if (stepCached) {
    var currentLayer = _toConsumableArray(stepCached.getCurrent());
    var index = currentLayer.findIndex(function (layer) {
      return layer.id === id;
    });
    var isBanDrag = currentLayer[index].banDrag;
    currentLayer[index].banDrag = !isBanDrag;
    setSteps(currentLayer);
  }
};
// // 成组
Core.madeGroup = function (layers) {
  var madeGroup = outerInstance.value.madeGroup;
  madeGroup(layers);
};

// 拆组
Core.divideGroup = function (groupId) {
  var divideGroup = outerInstance.value.divideGroup;
  divideGroup(groupId);
};
export default Core;