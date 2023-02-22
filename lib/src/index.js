"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_konva_1 = require("react-konva");
const lodash_1 = require("lodash");
const withTransform_1 = __importDefault(require("./hoc/withTransform"));
const KonvaImg_1 = __importDefault(require("./KonvaImg"));
const KonvaText_1 = __importDefault(require("./KonvaText"));
const KonvaShape_1 = __importDefault(require("./KonvaShape"));
const KonvaGroup_1 = __importDefault(require("./KonvaGroup"));
const utils_1 = require("./utils/utils");
const circularQueue_1 = __importDefault(require("./utils/circularQueue"));
const keyboardListener_1 = __importDefault(require("./keyboardListener"));
const KonvaGroup = (0, withTransform_1.default)(KonvaGroup_1.default);
const KonvaImage = (0, withTransform_1.default)(KonvaImg_1.default);
const KonvaText = (0, withTransform_1.default)(KonvaText_1.default);
const KonvaShape = (0, withTransform_1.default)(KonvaShape_1.default);
const hotkeyListener = new keyboardListener_1.default();
let stepCached;
const outerInstance = {
    value: {},
    attach(k, v) {
        this.value[k] = v;
    },
    clean() {
        this.value = {};
    },
};
const Shape = ({ width, height, backgroundColor = '#fff', backgroundStyle = {}, addItem, selectedItemChange, maxStep = 10, setRedo = () => { }, setWithdraw = () => { }, onChangeSelected = () => { }, bindRef = () => { }, stepInfo = [], onChangeStep = () => { }, }) => {
    const stageRef = (0, react_1.useRef)(null);
    const outRef = (0, react_1.useRef)(null);
    const [newId, setNewId] = (0, react_1.useState)(-2);
    const [selectedId, setSelected] = (0, react_1.useState)(0);
    const [steps, setSteps] = (0, react_1.useState)([]);
    const [stageScale, setStageScale] = (0, react_1.useState)(0.7);
    const [multiSelected, setMultiSelected] = (0, react_1.useState)(false);
    const onAdd = (item) => {
        if (stepCached) {
            const currentItem = stepCached.getCurrent();
            if (currentItem) {
                const infos = currentItem;
                const newItem = { ...item, id: 0 };
                const maxId = infos.reduce((prev, info) => (0, lodash_1.isNumber)(info.id) ? Math.max(Number(info.id), prev) : prev + 100, 0);
                const newId = isNaN(maxId) || !maxId ? new Date().getTime() : maxId + 1;
                setNewId(newId);
                setSelected(newId);
                newItem.id = newId;
                const list = [...infos, newItem];
                stepCached.enqueue(list);
                const currentInfo = stepCached.getCurrent();
                setSteps(currentInfo);
            }
        }
    };
    const handleInfo = (index, item) => {
        if (stepCached) {
            const infos = stepCached.getCurrent();
            const current = stepCached.getCurrent()[index];
            const newInfo = { ...current, ...item };
            const ins = [...infos];
            ins[index] = newInfo;
            stepCached.enqueue(ins);
            setSteps(stepCached.getCurrent());
        }
    };
    (0, react_1.useEffect)(() => {
        if (addItem) {
            onAdd(addItem);
        }
    }, [addItem]);
    (0, react_1.useEffect)(() => {
        if (selectedItemChange &&
            Object.keys(selectedItemChange).length &&
            selectedId) {
            handleSelectItem((item, index = -1) => {
                if (item && item.type === 'stage') {
                    return;
                }
                if (stepCached) {
                    const infos = stepCached.getCurrent();
                    if (Array.isArray(selectedItemChange)) {
                        const needUpdateLayers = [...selectedItemChange];
                        const infos = [...stepCached.getCurrent()];
                        for (let i = 0; i < needUpdateLayers.length; i++) {
                            const index = infos.findIndex((layer) => layer.id === needUpdateLayers[i]?.id);
                            infos[index] = needUpdateLayers[i];
                        }
                        stepCached.enqueue(infos);
                    }
                    else {
                        const properties = {
                            ...item,
                            ...selectedItemChange,
                        };
                        if (properties._ignore === true) {
                            delete properties._ignore;
                            const ins = [...infos];
                            ins[index] = properties;
                            stepCached.list[stepCached.current] = ins;
                            stepCached.clearAfterCurrent();
                            stepCached.enqueue(ins);
                        }
                        else {
                            const newInfos = [...infos];
                            newInfos[index] = properties;
                            stepCached.enqueue(newInfos);
                        }
                    }
                    const newSteps = stepCached.getCurrent();
                    console.log('newSteps', newSteps);
                    setSteps(newSteps);
                }
            });
        }
    }, [selectedItemChange]);
    const handleSelectItem = (0, react_1.useCallback)((cb = (a, b) => { }) => {
        if (selectedId === -1) {
            const item = { type: 'stage' };
            cb(item);
        }
        else if (Array.isArray(selectedId)) {
            const indexes = [];
            const items = [];
            for (let i = 0; i < steps.length; i += 1) {
                if (steps[i]?.id && selectedId.includes(steps[i].id)) {
                    indexes.push(steps[i].id);
                    items.push(steps[i]);
                }
            }
            cb(items);
        }
        else {
            if (Array.isArray(steps)) {
                const idx = steps.findIndex((i) => i?.id === selectedId);
                if (idx > -1) {
                    const item = steps[idx];
                    cb(item, idx);
                }
            }
            else {
                cb(undefined);
            }
        }
    }, [selectedId, steps]);
    const onRef = (0, react_1.useCallback)((ref) => {
        if (ref) {
            handleSelectItem((item, index = 0) => {
                if (item && item.type === 'stage') {
                    return;
                }
                const ele = ref.current;
                bindRef(ele);
            });
        }
    }, [bindRef, handleSelectItem, steps]);
    (0, react_1.useEffect)(() => {
        if (!(stepCached instanceof circularQueue_1.default)) {
            stepCached = new circularQueue_1.default(maxStep);
            if (stepInfo?.length) {
                stepCached.list[0] = (0, utils_1.handleDuplicateId)(stepInfo);
            }
            setSteps(stepCached.getCurrent());
            setWithdraw(false);
            setRedo(false);
        }
        else {
            if (stepInfo && stepInfo.length) {
                stepCached.list[stepCached.current] = (0, utils_1.handleDuplicateId)(stepInfo);
                const res = stepCached.getCurrent();
                setSteps(res);
                setWithdraw(false);
                setRedo(false);
            }
        }
        return () => {
        };
    }, [stepInfo]);
    (0, react_1.useEffect)(() => {
        const { current } = outRef;
        hotkeyListener.init(Shape);
        hotkeyListener.listening(current);
        return () => {
            stepCached = undefined;
            hotkeyListener.destory(current);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (stepCached) {
            setRedo(stepCached.canMoveForward);
            setWithdraw(stepCached.canMoveBack);
            handleSelectItem((item) => {
                if (Array.isArray(item) || (item && item.type !== 'stage')) {
                    onChangeSelected(item);
                }
            });
        }
        onChangeStep(steps);
    }, [steps]);
    (0, react_1.useEffect)(() => {
        handleSelectItem((item) => {
            if (item) {
                onChangeSelected(item);
            }
        });
    }, [selectedId]);
    const onClickStage = (e) => {
        setSelected(-1);
    };
    const handleSelected = (id, ref) => {
        if (multiSelected) {
            if ((0, lodash_1.isArray)(selectedId)) {
                setSelected([...selectedId, id]);
            }
            else {
                setSelected([selectedId, id]);
            }
        }
        else {
            setSelected(id);
        }
        if (ref && ref.current) {
            bindRef(ref.current);
        }
    };
    const copyItem = (0, react_1.useCallback)(() => {
        handleSelectItem((item, index = 0) => {
            if (Array.isArray(item)) {
                console.warn('暂不支持多选复制');
                return;
            }
            if (item && item.type === 'stage') {
                return;
            }
            let coordinate = { x: 0, y: 0 };
            const { x = 0, y = 0 } = item;
            coordinate = {
                x: x + 10,
                y: y + 10,
            };
            const copyItem = { ...item, ...coordinate, banDrag: 0, _isAdaptStage: 0 };
            onAdd(copyItem);
        });
    }, [selectedId, steps]);
    const deleteItem = (0, react_1.useCallback)(() => {
        handleSelectItem((item, index = -1) => {
            if (item) {
                if (Array.isArray(item)) {
                    console.warn('暂不支持多选删除');
                    return;
                }
                const info = [...steps];
                if (index > -1 && stepCached && !item.banDrag) {
                    info.splice(index, 1);
                    stepCached.enqueue(info);
                    setSteps(stepCached.getCurrent());
                    setSelected(-1);
                    onChangeSelected({});
                }
            }
        });
    }, [selectedId, steps]);
    const moveLayer = (0, react_1.useCallback)((direction, delta) => {
        if (!direction || !delta) {
            return;
        }
        const current = [...steps];
        let isChanged = false;
        handleSelectItem((item, currentLayerIndex = -1) => {
            if (item && item.type === 'stage') {
                return;
            }
            if (Array.isArray(item)) {
                console.warn('暂不支持多选移动');
                return;
            }
            if (currentLayerIndex >= 0) {
                const info = current[currentLayerIndex];
                const oldValue = info[direction] || 0;
                const patch = {
                    [direction]: oldValue + delta,
                };
                current[currentLayerIndex] = {
                    ...info,
                    ...patch,
                };
                isChanged = true;
            }
            if (isChanged && stepCached) {
                stepCached.enqueue(current);
                setSteps(stepCached.getCurrent());
            }
        });
    }, [selectedId, steps]);
    const moveLayerLevel = (0, react_1.useCallback)((i) => {
        const current = [...steps];
        let isChanged = false;
        handleSelectItem((item, currentLayerIndex = -1) => {
            if (item && item.type === 'stage') {
                return;
            }
            if (Array.isArray(item)) {
                console.warn('暂不支持多选移动');
                return;
            }
            if (currentLayerIndex >= 0) {
                const tmp = item;
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
    const madeGroup = (0, react_1.useCallback)((layers) => {
        const infos = [...steps];
        if (Array.isArray(layers) && stepCached) {
            const maxIndex = layers.reduce((cur, _, index) => Math.max(cur, index), 0);
            const newId = new Date().getTime();
            const group = {
                type: 'group',
                elements: [...layers],
                id: newId,
            };
            infos.splice(maxIndex + 1, 0, group);
            layers.forEach((layer) => {
                const { id } = layer;
                const index = infos.findIndex((oldLayer) => oldLayer.id === id);
                if (~index) {
                    infos.splice(index, 1);
                }
            });
            stepCached.enqueue(infos);
            setSteps(stepCached.getCurrent());
            setSelected(newId);
            console.log('stepCached.getCurrent()', stepCached.getCurrent());
        }
    }, [steps]);
    const divideGroup = (0, react_1.useCallback)((groupId) => {
        if (stepCached) {
            const infos = [...steps];
            const index = infos.findIndex((layer) => layer.id === groupId);
            if (~index) {
                const group = infos[index];
                if (group?.elements?.length) {
                    const { elements } = group;
                    infos.splice(index, 1, ...elements);
                    stepCached.enqueue(infos);
                    setSteps(stepCached.getCurrent());
                    setSelected(elements[0].id);
                    console.log('stepCached.getCurrent()', stepCached.getCurrent());
                }
            }
        }
    }, [steps]);
    (0, react_1.useEffect)(() => {
        outerInstance.attach('stageRef', stageRef);
        outerInstance.attach('setSelected', setSelected);
        outerInstance.attach('setStageScale', setStageScale);
        outerInstance.attach('setSteps', setSteps);
        outerInstance.attach('toggleMultiSelected', setMultiSelected);
    }, []);
    (0, react_1.useEffect)(() => {
        outerInstance.attach('deleteItem', deleteItem);
    }, [deleteItem]);
    (0, react_1.useEffect)(() => {
        outerInstance.attach('copyItem', copyItem);
    }, [copyItem]);
    (0, react_1.useEffect)(() => {
        outerInstance.attach('moveLayerLevel', moveLayerLevel);
    }, [moveLayerLevel]);
    (0, react_1.useEffect)(() => {
        outerInstance.attach('madeGroup', madeGroup);
    }, [madeGroup]);
    (0, react_1.useEffect)(() => {
        outerInstance.attach('divideGroup', divideGroup);
    }, [divideGroup]);
    (0, react_1.useEffect)(() => {
        outerInstance.attach('moveLayer', moveLayer);
    }, [moveLayer]);
    const renderGroup = (info, idx, inGroup = false) => info.type === 'image' ? ((0, jsx_runtime_1.jsx)(KonvaImage, { banDrag: inGroup ? true : undefined, ...info, value: info.value, isNew: newId === info.id, onRef: onRef, stageRef: stageRef, isSelected: (0, utils_1.isSelectedId)(selectedId, info.id), handleInfo: handleInfo.bind(null, idx), handleSelected: handleSelected.bind(null, info.id), id: String(info.id) })) : info.type === 'shape' ? ((0, jsx_runtime_1.jsx)(KonvaShape, { banDrag: inGroup ? true : undefined, ...info, stageRef: stageRef, onRef: onRef, isNew: newId === info.id, isSelected: (0, utils_1.isSelectedId)(selectedId, info.id), handleInfo: handleInfo.bind(null, idx), handleSelected: handleSelected.bind(null, info.id), stageScale: stageScale, id: String(info.id) })) : ((0, jsx_runtime_1.jsx)(KonvaText, { banDrag: inGroup ? true : undefined, ...info, stageRef: stageRef, onRef: onRef, isNew: newId === info.id, isSelected: (0, utils_1.isSelectedId)(selectedId, info.id), handleInfo: handleInfo.bind(null, idx), handleSelected: handleSelected.bind(null, info.id), stageScale: stageScale, id: String(info.id) }));
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            ...backgroundStyle,
            transform: `scale(${stageScale})`,
        }, className: "taki-canvas", ref: outRef, tabIndex: 0, children: (0, jsx_runtime_1.jsxs)(react_konva_1.Stage, { width: width, height: height, ref: stageRef, children: [(0, jsx_runtime_1.jsx)(react_konva_1.Layer, { children: (0, jsx_runtime_1.jsx)(react_konva_1.Rect, { width: width, height: height, x: 0, y: 0, onClick: onClickStage, fill: backgroundColor }) }, -1), steps &&
                    steps.map((info, idx) => info ? (info.type === 'group' ? ((0, jsx_runtime_1.jsx)(react_konva_1.Layer, { children: (0, jsx_runtime_1.jsx)(KonvaGroup, { type: "group", banDrag: false, onRef: onRef, stageRef: stageRef, isSelected: (0, utils_1.isSelectedId)(selectedId, info.id), handleInfo: handleInfo.bind(null, idx), handleSelected: handleSelected.bind(null, info.id), id: String(info.id), children: info.elements.map((i, iidx) => renderGroup(i, idx, true)) }) })) : ((0, jsx_runtime_1.jsx)(react_konva_1.Layer, { children: renderGroup(info, idx) }))) : null)] }) }));
};
Shape.exportToImage = (filename = 'stage.jpg', options = {
    scale: 1,
    quality: 1,
}) => {
    const { scale = 1, quality = 1, fileType = 'image/png' } = options;
    const { stageRef, setSelected } = outerInstance.value;
    setSelected(0);
    setTimeout(() => {
        try {
            if (stageRef && stageRef.current) {
                const [, ext] = fileType.split('/');
                const FileName = filename + '.' + ext;
                const uri = stageRef.current.toDataURL({
                    pixelRatio: scale,
                    quality,
                    mimeType: fileType,
                });
                (0, utils_1.downloadURI)(uri, FileName);
            }
        }
        catch (err) {
            console.log('err in exportToImage', err);
        }
    }, 100);
};
Shape.exportToBASE64 = () => {
    const { stageRef, setSelected } = outerInstance.value;
    setSelected(0);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stageRef && stageRef.current) {
                const b64 = stageRef.current.toDataURL();
                resolve(b64);
            }
            else {
                reject();
            }
        }, 1000);
    });
};
Shape.exportToFile = (format = 'png', fileName) => {
    const { stageRef, setSelected } = outerInstance.value;
    function dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        if (arr[0]) {
            const reg = /:(.*?);/;
            const regString = arr[0].match(reg);
            if (regString) {
                const mime = regString[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, { type: mime });
            }
        }
    }
    if (stageRef && stageRef.current) {
        setSelected(-1);
        const b64 = stageRef.current.toDataURL();
        return dataURLtoFile(b64, fileName + '.' + format);
    }
};
Shape.withdraw = () => {
    const { setSteps } = outerInstance.value;
    if (stepCached && stepCached.canMoveBack) {
        stepCached.moveBack();
        const curr = stepCached.getCurrent();
        setSteps(curr);
    }
};
Shape.redo = () => {
    const { setSteps } = outerInstance.value;
    if (stepCached && stepCached.canMoveForward) {
        stepCached.moveForward();
        setSteps(stepCached.getCurrent());
    }
};
Shape.canvasScale = (ratio) => {
    const { setStageScale } = outerInstance.value;
    if (ratio <= 2.75 && ratio > 0) {
        setStageScale(ratio);
    }
};
Shape.deleteItem = () => {
    const { deleteItem } = outerInstance.value;
    deleteItem();
};
Shape.copyItem = () => {
    const { copyItem } = outerInstance.value;
    copyItem();
};
Shape.getInfo = () => {
    if (stepCached) {
        const unHandledInfos = stepCached.getCurrent();
        const result = unHandledInfos.map((info) => {
            const res = { ...info };
            delete res._isProportionalScaling;
            delete res._ignore;
            delete res._isAdaptStage;
            delete res._isChangedCrop;
            return res;
        });
        return result;
    }
};
Shape.moveLayerLevel = (i) => {
    const { moveLayerLevel } = outerInstance.value;
    moveLayerLevel(i);
};
Shape.moveLayer = (direction, delta) => {
    const { moveLayer } = outerInstance.value;
    moveLayer(direction, delta);
};
Shape.clearSelected = () => {
    const { setSelected } = outerInstance.value;
    setSelected(-1);
};
Shape.setSelectedIndex = (id) => {
    const { setSelected } = outerInstance.value;
    setSelected(id);
};
Shape.toggleMultiSelected = (state) => {
    const { toggleMultiSelected } = outerInstance.value;
    toggleMultiSelected(state);
};
Shape.toogleLock = (id) => {
    const { setSteps } = outerInstance.value;
    if (stepCached) {
        const currentLayer = [...stepCached.getCurrent()];
        const index = currentLayer.findIndex((layer) => layer.id === id);
        const isBanDrag = currentLayer[index].banDrag;
        currentLayer[index].banDrag = !isBanDrag;
        setSteps(currentLayer);
    }
};
Shape.madeGroup = (layers) => {
    const { madeGroup } = outerInstance.value;
    madeGroup(layers);
};
Shape.divideGroup = (groupId) => {
    const { divideGroup } = outerInstance.value;
    divideGroup(groupId);
};
exports.default = Shape;
