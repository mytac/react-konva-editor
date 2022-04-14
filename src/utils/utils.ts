/**
 * canvasInfo中有重复的id，对其进行替换并输出
 */
const handleDuplicateId = (canvasInfo = []) => {
  const idMap: any = {};

  return canvasInfo.map((info: any) => {
    if (info) {
      if (info.id && idMap[info.id]) {
        // 重复的值则进行替换
        const newKey: number =
          Number(info.id) + Number((Math.random() * 100).toFixed());
        idMap[newKey] = 1;
        return {
          ...info,
          id: newKey,
        };
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

export { handleDuplicateId, downloadURI };
