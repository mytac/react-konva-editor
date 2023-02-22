"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMultiPatch = exports.isSelectedId = exports.downloadURI = exports.handleDuplicateId = void 0;
const lodash_1 = require("lodash");
const handleDuplicateId = (canvasInfo = []) => {
    const idMap = {};
    return canvasInfo.map((info) => {
        if (info) {
            if (info.id && idMap[info.id]) {
                if (typeof info.id === 'number') {
                    const newKey = Number(info.id) + Number((Math.random() * 100).toFixed());
                    idMap[newKey] = 1;
                    return {
                        ...info,
                        id: newKey,
                    };
                }
                else if (typeof info.id === 'string') {
                    const newKey = info.id + '_duplicate';
                    idMap[newKey] = 1;
                    return {
                        ...info,
                        id: newKey,
                    };
                }
                else {
                    return {
                        ...info,
                        id: new Date().getTime(),
                    };
                }
            }
            else {
                idMap[info.id] = 1;
                return info;
            }
        }
        return info;
    });
};
exports.handleDuplicateId = handleDuplicateId;
const downloadURI = (uri, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
exports.downloadURI = downloadURI;
const isSelectedId = (id, layerId) => {
    if (Array.isArray(id)) {
        return id.includes(layerId);
    }
    else {
        return id === layerId;
    }
};
exports.isSelectedId = isSelectedId;
const updateMultiPatch = (patch, layers) => {
    const newLayers = [...layers];
    if ((0, lodash_1.isObject)(patch)) {
        const ids = Object.keys(patch);
        ids.forEach((id) => {
            const index = newLayers.findIndex((layer) => layer?.id === id);
            if (index > -1 && (0, lodash_1.isObject)(patch[id])) {
                newLayers[index] = { ...newLayers[index], ...patch[id] };
            }
        });
    }
    console.error('多选patch格式错误');
};
exports.updateMultiPatch = updateMultiPatch;
