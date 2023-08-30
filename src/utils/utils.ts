import _, { isObject } from 'lodash';
import { Iinfo, IcommonInfo, LayerIdType } from '../type';

const randomId = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10; // 生成10位的随机字符串
  const randomChars = _.sampleSize(chars, length);
  return randomChars.join('');
};

/**
 * canvasInfo中有重复的id，对其进行替换并输出
 * TODO: 未进行嵌套组结构适配
 */
const handleDuplicateId = (canvasInfo: IcommonInfo[] = []) => {
  const idMap: any = {};

  /**
   * 产生独一的key
   * @param key label或原本的id
   * @returns keystring
   */
  const handleKey = (key: string | number, label?: string) => {
    const isExisit = !!idMap[key];
    if (!isExisit) {
      idMap[key] = 1;
      return key;
    } else {
      if (label) {
        return idMap[label] ? randomId() : label;
      }
      return randomId();
    }
  };

  return canvasInfo.map((info: IcommonInfo) => {
    if (info) {
      // @ts-ignore
      const { id, label, value, elementName, name } = info;
      return {
        ...info,
        label: label || name || value || elementName,
        id: handleKey(id, label),
      };
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

const isSelectedId = (id: LayerIdType, layerId: number) => {
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
