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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Group } from 'react-konva';
import withTransform from './hoc/withTransform';
import MyImage from './KonvaImg';
import MyText from './KonvaText';
import { handleDuplicateId, downloadURI } from './utils/utils';
import circularQueue from './utils/circularQueue';
import KeyboardListener from './keyboardListener';
var KonvaImage = withTransform(MyImage);
var KonvaText = withTransform(MyText);
var hotkeyListener = new KeyboardListener();
var stepCached;
var outerInstance = {
    value: {},
    attach: function (k, v) {
        this.value[k] = v;
    },
    clean: function () {
        this.value = {};
    },
};
var Shape = function (_a) {
    var width = _a.width, height = _a.height, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? '#fff' : _b, _c = _a.backgroundStyle, backgroundStyle = _c === void 0 ? {} : _c, addItem = _a.addItem, selectedItemChange = _a.selectedItemChange, _d = _a.maxStep, maxStep = _d === void 0 ? 10 : _d, _e = _a.setRedo, setRedo = _e === void 0 ? function () { } : _e, _f = _a.setWithdraw, setWithdraw = _f === void 0 ? function () { } : _f, _g = _a.onChangeSelected, onChangeSelected = _g === void 0 ? function () { } : _g, _h = _a.bindRef, bindRef = _h === void 0 ? function () { } : _h, _j = _a.stepInfo, stepInfo = _j === void 0 ? [] : _j, _k = _a.onChangeStep, onChangeStep = _k === void 0 ? function () { } : _k;
    var stageRef = useRef(null);
    var outRef = useRef(null);
    var _l = useState(-2), newId = _l[0], setNewId = _l[1];
    var _m = useState(0), selectedId = _m[0], setSelected = _m[1];
    var _o = useState([]), steps = _o[0], setSteps = _o[1];
    var _p = useState(0.7), stageScale = _p[0], setStageScale = _p[1];
    var onAdd = function (item) {
        if (stepCached) {
            var currentItem = stepCached.getCurrent();
            if (currentItem) {
                var infos = currentItem;
                var newItem = __assign(__assign({}, item), { id: 0 });
                var maxId = infos.reduce(function (prev, info) {
                    return info && info.id ? Math.max(Number(info.id), prev) : prev + 100;
                }, 0);
                var newId_1 = maxId ? maxId + 1 : 1000;
                setNewId(newId_1);
                setSelected(newId_1);
                newItem.id = newId_1;
                var list = __spreadArray(__spreadArray([], infos, true), [newItem], false);
                stepCached.enqueue(list);
                var currentInfo = stepCached.getCurrent();
                setSteps(currentInfo);
            }
        }
    };
    var handleInfo = function (index, item) {
        if (stepCached) {
            var infos = stepCached.getCurrent();
            var current = stepCached.getCurrent()[index];
            var newInfo = __assign(__assign({}, current), item);
            var ins = __spreadArray([], infos, true);
            ins[index] = newInfo;
            stepCached.enqueue(ins);
            setSteps(stepCached.getCurrent());
        }
    };
    useEffect(function () {
        if (addItem) {
            onAdd(addItem);
        }
    }, [addItem]);
    useEffect(function () {
        if (selectedItemChange &&
            Object.keys(selectedItemChange).length &&
            selectedId) {
            handleSelectItem(function (item, index) {
                if (index === void 0) { index = -1; }
                if (item && item.type === 'stage') {
                    return;
                }
                if (stepCached) {
                    var infos = stepCached.getCurrent();
                    var properties = __assign(__assign({}, item), selectedItemChange);
                    if (properties._ignore === true) {
                        delete properties._ignore;
                        var ins = __spreadArray([], infos, true);
                        ins[index] = properties;
                        stepCached.list[stepCached.current] = ins;
                        stepCached.clearAfterCurrent();
                        stepCached.enqueue(ins);
                    }
                    else {
                        var newInfos = __spreadArray([], infos, true);
                        newInfos[index] = properties;
                        stepCached.enqueue(newInfos);
                    }
                    var newSteps = stepCached.getCurrent();
                    setSteps(newSteps);
                }
            });
        }
    }, [selectedItemChange]);
    var handleSelectItem = useCallback(function (cb) {
        if (cb === void 0) { cb = function (a, b) { }; }
        if (selectedId === -1) {
            var item = { type: 'stage' };
            cb(item);
        }
        else {
            if (Array.isArray(steps)) {
                var idx = steps.findIndex(function (i) { return (i === null || i === void 0 ? void 0 : i.id) === selectedId; });
                if (idx > -1) {
                    var item = steps[idx];
                    cb(item, idx);
                }
            }
            else {
                cb(undefined);
            }
        }
    }, [selectedId, steps]);
    var onRef = useCallback(function (ref) {
        if (ref) {
            handleSelectItem(function (item, index) {
                if (index === void 0) { index = 0; }
                if (item && item.type === 'stage') {
                    return;
                }
                var ele = ref.current;
                bindRef(ele);
            });
        }
    }, [bindRef, handleSelectItem, steps]);
    useEffect(function () {
        if (!(stepCached instanceof circularQueue)) {
            stepCached = new circularQueue(maxStep);
            if (stepInfo === null || stepInfo === void 0 ? void 0 : stepInfo.length) {
                stepCached.list[0] = handleDuplicateId(stepInfo);
            }
            setSteps(stepCached.getCurrent());
            setWithdraw(false);
            setRedo(false);
        }
        else {
            if (stepInfo && stepInfo.length) {
                stepCached.list[stepCached.current] = handleDuplicateId(stepInfo);
                var res = stepCached.getCurrent();
                setSteps(res);
                setWithdraw(false);
                setRedo(false);
            }
        }
        return function () {
        };
    }, [stepInfo]);
    useEffect(function () {
        var current = outRef.current;
        hotkeyListener.init(Shape);
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
                if (item && item.type !== 'stage') {
                    onChangeSelected(item);
                }
            });
        }
        onChangeStep(steps);
    }, [steps]);
    useEffect(function () {
        handleSelectItem(function (item) {
            if (item) {
                onChangeSelected(item);
            }
        });
    }, [selectedId]);
    var onClickStage = function (e) {
        setSelected(-1);
    };
    var handleSelected = function (selectedId, ref) {
        setSelected(selectedId);
        if (ref && ref.current) {
            bindRef(ref.current);
        }
    };
    var copyItem = useCallback(function () {
        handleSelectItem(function (item, index) {
            if (index === void 0) { index = 0; }
            if (item && item.type === 'stage') {
                return;
            }
            var coordinate = { x: 0, y: 0 };
            var _a = item.x, x = _a === void 0 ? 0 : _a, _b = item.y, y = _b === void 0 ? 0 : _b;
            coordinate = {
                x: x + 10,
                y: y + 10,
            };
            var copyItem = __assign(__assign(__assign({}, item), coordinate), { banDrag: 0, _isAdaptStage: 0 });
            onAdd(copyItem);
        });
    }, [selectedId, steps]);
    var deleteItem = useCallback(function () {
        if (selectedId >= 1000) {
            handleSelectItem(function (item, index) {
                if (index === void 0) { index = -1; }
                if (item) {
                    var info = __spreadArray([], steps, true);
                    if (index > -1 && stepCached && !item.banDrag) {
                        info.splice(index, 1);
                        stepCached.enqueue(info);
                        setSteps(stepCached.getCurrent());
                        setSelected(-1);
                        onChangeSelected({});
                    }
                }
            });
        }
    }, [selectedId, steps]);
    var moveLayer = useCallback(function (i) {
        var current = __spreadArray([], steps, true);
        var isChanged = false;
        handleSelectItem(function (item, currentLayerIndex) {
            if (currentLayerIndex === void 0) { currentLayerIndex = -1; }
            if (item && item.type === 'stage') {
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
                }
                else if (i < 0) {
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
    useEffect(function () {
        outerInstance.attach('stageRef', stageRef);
        outerInstance.attach('setSelected', setSelected);
        outerInstance.attach('setStageScale', setStageScale);
        outerInstance.attach('setSteps', setSteps);
    }, []);
    useEffect(function () {
        outerInstance.attach('deleteItem', deleteItem);
    }, [deleteItem]);
    useEffect(function () {
        outerInstance.attach('copyItem', copyItem);
    }, [copyItem]);
    useEffect(function () {
        outerInstance.attach('moveLayer', moveLayer);
    }, [moveLayer]);
    return (_jsx("div", __assign({ style: __assign(__assign({}, backgroundStyle), { transform: "scale(".concat(stageScale, ")") }), className: "taki-canvas", ref: outRef, tabIndex: 0 }, { children: _jsxs(Stage, __assign({ width: width, height: height, ref: stageRef }, { children: [_jsx(Layer, { children: _jsx(Rect, { width: width, height: height, x: 0, y: 0, onClick: onClickStage, fill: backgroundColor }) }, -1), _jsx(Layer, { children: steps &&
                        steps.map(function (info, idx) {
                            return info ? (_jsx(Group, { children: info.type === 'image' ? (_jsx(KonvaImage, __assign({}, info, { value: info.value, isNew: newId === info.id, onRef: onRef, stageRef: stageRef, isSelected: info.id === selectedId, handleInfo: handleInfo.bind(null, idx), handleSelected: handleSelected.bind(null, info.id), id: String(info.id) }))) : (_jsx(KonvaText, __assign({}, info, { stageRef: stageRef, onRef: onRef, isNew: newId === info.id, isSelected: info.id === selectedId, handleInfo: handleInfo.bind(null, idx), handleSelected: handleSelected.bind(null, info.id), stageScale: stageScale, id: String(info.id) }))) }, info.id)) : null;
                        }) })] })) })));
};
Shape.exportToImage = function (filename) {
    if (filename === void 0) { filename = 'stage.jpg'; }
    var _a = outerInstance.value, stageRef = _a.stageRef, setSelected = _a.setSelected;
    setSelected(0);
    setTimeout(function () {
        if (stageRef && stageRef.current) {
            var uri = stageRef.current.toDataURL();
            downloadURI(uri, filename);
        }
    }, 100);
};
Shape.exportToBASE64 = function () {
    var _a = outerInstance.value, stageRef = _a.stageRef, setSelected = _a.setSelected;
    setSelected(0);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (stageRef && stageRef.current) {
                var b64 = stageRef.current.toDataURL();
                resolve(b64);
            }
            else {
                reject();
            }
        }, 1000);
    });
};
Shape.exportToFile = function (format, fileName) {
    if (format === void 0) { format = 'png'; }
    var _a = outerInstance.value, stageRef = _a.stageRef, setSelected = _a.setSelected;
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
                return new File([u8arr], filename, { type: mime });
            }
        }
    }
    if (stageRef && stageRef.current) {
        setSelected(0);
        var b64 = stageRef.current.toDataURL();
        return dataURLtoFile(b64, fileName + '.' + format);
    }
};
Shape.withdraw = function () {
    var setSteps = outerInstance.value.setSteps;
    if (stepCached && stepCached.canMoveBack) {
        stepCached.moveBack();
        var curr = stepCached.getCurrent();
        setSteps(curr);
    }
};
Shape.redo = function () {
    var setSteps = outerInstance.value.setSteps;
    if (stepCached && stepCached.canMoveForward) {
        stepCached.moveForward();
        setSteps(stepCached.getCurrent());
    }
};
Shape.canvasScale = function (ratio) {
    var setStageScale = outerInstance.value.setStageScale;
    if (ratio <= 2.75 && ratio > 0) {
        setStageScale(ratio);
    }
};
Shape.deleteItem = function () {
    var deleteItem = outerInstance.value.deleteItem;
    deleteItem();
};
Shape.copyItem = function () {
    var copyItem = outerInstance.value.copyItem;
    copyItem();
};
Shape.getInfo = function () {
    if (stepCached) {
        var unHandledInfos = stepCached.getCurrent();
        var result = unHandledInfos.map(function (info) {
            var res = __assign({}, info);
            delete res._isProportionalScaling;
            delete res._ignore;
            delete res._isAdaptStage;
            return res;
        });
        return result;
    }
};
Shape.moveLayer = function (i) {
    var moveLayer = outerInstance.value.moveLayer;
    moveLayer(i);
};
Shape.clearSelected = function () {
    var setSelected = outerInstance.value.setSelected;
    setSelected(-1);
};
Shape.setSelectedIndex = function (id) {
    var setSelected = outerInstance.value.setSelected;
    setSelected(id);
};
Shape.toogleLock = function (id) {
    var setSteps = outerInstance.value.setSteps;
    if (stepCached) {
        var currentLayer = __spreadArray([], stepCached.getCurrent(), true);
        var index = currentLayer.findIndex(function (layer) { return layer.id === id; });
        var isBanDrag = currentLayer[index].banDrag;
        currentLayer[index].banDrag = !isBanDrag;
        setSteps(currentLayer);
    }
};
export default Shape;
