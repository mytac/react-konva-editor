function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { isObject } from 'lodash';
/**
 * canvasInfo中有重复的id，对其进行替换并输出
 */
var handleDuplicateId = function handleDuplicateId() {
  var canvasInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var idMap = {};
  return canvasInfo.map(function (info) {
    if (info) {
      if (info.id && idMap[info.id]) {
        if (typeof info.id === 'number') {
          // 重复的值则进行替换
          var newKey = Number(info.id) + Number((Math.random() * 100).toFixed());
          idMap[newKey] = 1;
          return _objectSpread(_objectSpread({}, info), {}, {
            id: newKey
          });
        } else if (typeof info.id === 'string') {
          var _newKey = info.id + '_duplicate';
          idMap[_newKey] = 1;
          return _objectSpread(_objectSpread({}, info), {}, {
            id: _newKey
          });
        } else {
          return _objectSpread(_objectSpread({}, info), {}, {
            id: new Date().getTime()
          });
        }
      } else {
        idMap[info.id] = 1;
        return info;
      }
    }
    return info;
  });
};
var downloadURI = function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
var isSelectedId = function isSelectedId(id, layerId) {
  if (Array.isArray(id)) {
    return id.includes(layerId);
  } else {
    return id === layerId;
  }
};

// 多选元素更新patch
var updateMultiPatch = function updateMultiPatch(patch, layers) {
  var newLayers = _toConsumableArray(layers);
  if (isObject(patch)) {
    var ids = Object.keys(patch);
    ids.forEach(function (id) {
      var index = newLayers.findIndex(function (layer) {
        return (layer === null || layer === void 0 ? void 0 : layer.id) === id;
      });
      // @ts-ignore
      if (index > -1 && isObject(patch[id])) {
        //@ts-ignore
        newLayers[index] = _objectSpread(_objectSpread({}, newLayers[index]), patch[id]);
      }
    });
  }
  console.error('多选patch格式错误');
};
export { handleDuplicateId, downloadURI, isSelectedId, updateMultiPatch };