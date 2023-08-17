import { isObject,isString,isNumber } from 'lodash';
import { Iinfo } from '../type';
/**
 * canvasInfo中有重复的id，对其进行替换并输出
 */
const handleDuplicateId = (canvasInfo = []) => {
  const idMap: any = {};

  return canvasInfo.map((info: any) => {
    if (info) {
      if (info.id && idMap[info.id]) {
        if (isNumber(info.id)) {
          // 重复的值则进行替换
          const newKey: number =
            Number(info.id) + Number((Math.random() * 100).toFixed());
          idMap[newKey] = 1;
          return {
            ...info,
            id: newKey,
          };
        } else if (isString(info.id)) {
          const newKey: string = info.id + '_duplicate';
          idMap[newKey] = 1;
          return {
            ...info,
            id: newKey,
          };
        } else {
          return {
            ...info,
            id: new Date().getTime(),
          };
        }
      } else {
        idMap[info.id] = 1;
        return info;
      }
    }
    return info;
  });
};

const downloadURI = (uri: string, name: string) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const isSelectedId = (id: number | Array<number>, layerId: number) => {
  if (Array.isArray(id)) {
    return id.includes(layerId);
  } else {
    return id === layerId;
  }
};

// 多选元素更新patch
const updateMultiPatch = (patch: any, layers: Array<Iinfo>) => {
  const newLayers = [...layers];
  if (isObject(patch)) {
    const ids = Object.keys(patch);
    ids.forEach((id: string) => {
      const index = newLayers.findIndex((layer: any) => layer?.id === id);
      // @ts-ignore
      if (index > -1 && isObject(patch[id])) {
        //@ts-ignore
        newLayers[index] = { ...newLayers[index], ...patch[id] };
      }
    });
  }
  console.error('多选patch格式错误');
};

export { handleDuplicateId, downloadURI, isSelectedId, updateMultiPatch };
