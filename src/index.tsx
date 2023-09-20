import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';
import {
  IProps,
  Iinfo,
  IaddItem,
  IFunc,
  IcommonInfo,
  IgroupInfo,
  LayerIdType,
} from './type';
import withTransform from './hoc/withTransform';
import MyImage from './KonvaImg';
import MyText from './KonvaText';
import MyShape from './KonvaShape';
import MyGroup from './KonvaGroup';
import { handleDuplicateId, downloadURI, isSelectedId } from './utils/utils';
import circularQueue from './utils/circularQueue';
import KeyboardListener from './keyboardListener';
import { isArray, isNumber } from 'lodash';

// @ts-ignore
const KonvaGroup = withTransform(MyGroup);
// @ts-ignore
const KonvaImage = withTransform(MyImage);
// @ts-ignore
const KonvaText = withTransform(MyText);
// @ts-ignore
const KonvaShape = withTransform(MyShape);
const hotkeyListener = new KeyboardListener();
let stepCached: circularQueue | undefined;

interface ShapePropsNApi extends FC<IProps>, IFunc {}

const outerInstance: any = {
  value: {},
  attach(k: string, v: any) {
    this.value[k] = v;
  },
  clean() {
    this.value = {};
  },
};

const Core: ShapePropsNApi = ({
  width,
  height,
  backgroundColor = '#fff',
  backgroundStyle = {},
  addItem,
  selectedItemChange,
  maxStep = 10, // 撤销重做保存的最大步数
  setRedo = () => {},
  setWithdraw = () => {},
  onChangeSelected = () => {},
  bindRef = () => {},
  stepInfo = [],
  onChangeStep = () => {},
}) => {
  const stageRef = useRef<Konva.Stage>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const [newId, setNewId] = useState(-2);
  const [selectedId, setSelected] = useState<LayerIdType | Array<LayerIdType>>(0);
  const [steps, setSteps] = useState<any>([]);
  const [stageScale, setStageScale] = useState(0.7);
  const [multiSelected, setMultiSelected] = useState<boolean>(false);

  // 添加新元素时
  const onAdd = (item: IaddItem) => {
    if (stepCached) {
      const currentItem = stepCached.getCurrent();
      if (currentItem) {
        const infos: Iinfo[] = currentItem;
        const newItem = { ...item, id: 0 };
        const maxId = infos.reduce(
          (prev, info) =>
            isNumber(info.id) ? Math.max(Number(info.id), prev) : prev + 100,
          0
        );
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

  // 当元素进行改变时
  const handleInfo = useCallback((index: number, item: object) => {
    if (stepCached) {
      const infos: Iinfo[] = stepCached.getCurrent();
      const current = stepCached.getCurrent()[index];
      const newInfo = { ...current, ...item };
      const ins = [...infos];
      ins[index] = newInfo;
      stepCached.enqueue(ins);
      setSteps(stepCached.getCurrent());
    }
  }, []);

  // 通过id改变图层属性
  const changeLayerInfoById = useCallback(
    (id: LayerIdType, item: object) => {
      const index = steps.findIndex((layer: Iinfo) => layer.id === id);
      if (~index) {
        handleInfo(index, item);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId]
  );

  useEffect(() => {
    if (addItem) {
      onAdd(addItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItem]);

  useEffect(() => {
    if (
      // 当改变选择元素的参数
      selectedItemChange &&
      Object.keys(selectedItemChange).length &&
      selectedId
    ) {
      handleSelectItem((item: IcommonInfo | undefined, index = -1) => {
        if (item && item.type === 'stage') {
          return;
        }
        // 当改变的为item时，更新图层信息

        if (stepCached) {
          const infos = stepCached.getCurrent();
          if (Array.isArray(selectedItemChange)) {
            // 多选图层批量更新属性
            // 多选图层
            const needUpdateLayers = [...selectedItemChange];
            const infos = [...stepCached.getCurrent()];
            for (let i = 0; i < needUpdateLayers.length; i++) {
              const index = infos.findIndex(
                (layer: Iinfo) => layer.id === needUpdateLayers[i]?.id
              );
              infos[index] = needUpdateLayers[i];
            }
            stepCached.enqueue(infos);
          } else {
            // 单选图层，改变属性
            const properties = {
              ...item,
              ...selectedItemChange,
            };

            if (properties._ignore === true) {
              // 不入队，替换当前指针所指元素，并清空current之后的队内元素
              delete properties._ignore;
              const ins = [...infos];
              ins[index] = properties;
              //@ts-ignore
              stepCached.list[stepCached.current] = ins;
              stepCached.clearAfterCurrent();
              stepCached.enqueue(ins);
            } else {
              const newInfos = [...infos];
              newInfos[index] = properties;
              stepCached.enqueue(newInfos);
            }
          }

          const newSteps = stepCached.getCurrent();
          console.log('newSteps', newSteps);
          setSteps(newSteps);
          // bindRef(ref)
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItemChange]); // 更改选中元素的属性

  const handleSelectItem = useCallback(
    (cb = (a: Iinfo | undefined) => {}) => {
      if (selectedId === -1) {
        // stage
        const item = { type: 'stage' };
        cb(item);
      } else if (Array.isArray(selectedId)) {
        // 多选形态
        const indexes = [];
        const items = [];
        for (let i = 0; i < steps.length; i++) {
          const current: Iinfo = steps[i]
          // @ts-ignore
          if (selectedId.includes(current.id)) {
             // @ts-ignore
            indexes.push(current.id);
             // @ts-ignore
            items.push(current);
          }
        }
        cb(items);
      } else {
        if (Array.isArray(steps)) {
          const idx = steps.findIndex((i: any) => i?.id === selectedId);
          if (idx > -1) {
            const item = steps[idx];
            cb(item, idx);
          }
        } else {
          cb(undefined);
        }
      }
    },
    [selectedId, steps]
  );

  const onRef = useCallback(
    (ref: any) => {
      if (ref) {
        handleSelectItem((item: IcommonInfo | undefined, index = 0) => {
          if (item && item.type === 'stage') {
            return;
          }
          const ele = ref.current;
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
    [bindRef, handleSelectItem, steps]
  );

  useEffect(() => {
    if (!(stepCached instanceof circularQueue)) {
      // 初始化
      stepCached = new circularQueue(maxStep);
      if (stepInfo?.length) {
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
        const res = stepCached.getCurrent();
        setSteps(res);
        setWithdraw(false);
        setRedo(false);
      }
    }
    // window.addEventListener('keypress', dragListener);
    return () => {
      // window.removeEventListener('keypress', dragListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepInfo]);

  useEffect(() => {
    const { current } = outRef;
    hotkeyListener.init(Core);
    hotkeyListener.listening(current);
    return () => {
      stepCached = undefined;
      hotkeyListener.destory(current);
    };
  }, []);

  useEffect(() => {
    if (stepCached) {
      setRedo(stepCached.canMoveForward);
      setWithdraw(stepCached.canMoveBack);
      handleSelectItem((item: IcommonInfo | Array<IcommonInfo> | undefined) => {
        if (Array.isArray(item) || (item && item.type !== 'stage')) {
          onChangeSelected(item);
        }
      });
    }
    onChangeStep(steps);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    handleSelectItem((item: Iinfo | Array<Iinfo> | undefined) => {
      if (item) {
        onChangeSelected(item);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const onClickStage = (e: any) => {
    setSelected(-1);
  };

  const handleSelected = (id: LayerIdType, ref: any) => {
    if (multiSelected) {
      // 多选
      if (isArray(selectedId)) {
        // 已开启多选模式下的 selectedId
        setSelected([...selectedId, id]);
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

  const copyItem = useCallback(() => {
    handleSelectItem((item: any, index = 0) => {
      if (Array.isArray(item)) {
        console.warn('暂不支持多选复制');
        return;
      }
      if (item && item.type === 'stage') {
        return;
      }
      let coordinate: any = { x: 0, y: 0 };
      const { x = 0, y = 0 } = item;
      coordinate = {
        x: x + 10,
        y: y + 10,
      };
      const copyItem = { ...item, ...coordinate, banDrag: 0, _isAdaptStage: 0 };
      onAdd(copyItem);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, steps]);

  const deleteItem = useCallback(() => {
    handleSelectItem((item: any, index = -1) => {
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
          setSelected(-1); // 删除一个就指向舞台
          onChangeSelected({});
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, steps]);

  // 上下左右微调图层
  const moveLayer = useCallback(
    (direction: string, delta: number) => {
      if (!direction || !delta) {
        return;
      }

      const current = [...steps];
      let isChanged = false;

      handleSelectItem((item: any, currentLayerIndex = -1) => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId, steps]
  );

  // 全量更新
  // const updateAllLayers = (newLayers:Array<Iinfo>) => {
  //   setSteps(newLayers)
  // }

  // 移动图层层级
  const moveLayerLevel = useCallback(
    (i: number) => {
      const current = [...steps];
      let isChanged = false;
      handleSelectItem((item: any, currentLayerIndex = -1) => {
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
    },
    [handleSelectItem, steps]
  );

  // 成组
  const madeGroup = useCallback(
    (layers: any) => {
      const infos:any = [...steps];
      if (Array.isArray(layers) && stepCached) {
        // 拿到最大索引，最终group所属层级为最高层
        const maxIndex = layers.reduce(
          (cur, _, index) => Math.max(cur, index),
          0
        );
        const newId = new Date().getTime();
        // 删除索引
        const group = {
          type: 'group',
          elements: [...layers],
          id: newId,
          isNew: true,
        };
        infos.splice(maxIndex + 1, 0, group);
        // 删除原图层
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
    },
    [steps]
  );

  // 拆组
  const divideGroup = useCallback(
    (groupId: string) => {
      if (stepCached) {
        const infos = [...steps];
        const index = infos.findIndex((layer) => layer.id === groupId);
        if (~index) {
          const group = infos[index];
          if ((group as IgroupInfo)?.elements?.length) {
            const { elements } = group as IgroupInfo;
            infos.splice(index, 1, ...elements);
            stepCached.enqueue(infos);
            setSteps(stepCached.getCurrent());
            // @ts-ignore
            setSelected(elements[0].id);
            console.log('stepCached.getCurrent()', stepCached.getCurrent());
          }
        }
      }
    },
    [steps]
  );

  useEffect(() => {
    outerInstance.attach('stageRef', stageRef);
    outerInstance.attach('setSelected', setSelected);
    outerInstance.attach('setStageScale', setStageScale);
    outerInstance.attach('setSteps', setSteps);
    outerInstance.attach('toggleMultiSelected', setMultiSelected);
  }, []);

  useEffect(() => {
    outerInstance.attach('deleteItem', deleteItem);
  }, [deleteItem]);

  useEffect(() => {
    outerInstance.attach('copyItem', copyItem);
  }, [copyItem]);

  useEffect(() => {
    outerInstance.attach('moveLayerLevel', moveLayerLevel);
  }, [moveLayerLevel]);

  useEffect(() => {
    outerInstance.attach('madeGroup', madeGroup);
  }, [madeGroup]);

  useEffect(() => {
    outerInstance.attach('divideGroup', divideGroup);
  }, [divideGroup]);

  useEffect(() => {
    outerInstance.attach('moveLayer', moveLayer);
  }, [moveLayer]);

  useEffect(() => {
    outerInstance.attach('changeLayerInfoById', changeLayerInfoById);
  }, [changeLayerInfoById]);

  const renderGroup = (info: Iinfo, idx: number, inGroup: boolean = false) => {
    const { type } = info;
    if (type === 'group' && (info as IgroupInfo).elements) {
      return (
        // @ts-ignore
        <KonvaGroup
          key={info.id}
          type="group"
          banDrag={false}
          onRef={onRef}
          stageRef={stageRef}
          // @ts-ignore  TODO:先忽略这个吧，不太好高
          isSelected={isSelectedId(selectedId, info.id)}
          handleInfo={handleInfo.bind(null, idx)}
          // @ts-ignore  TODO:先忽略这个吧，不太好高
          handleSelected={handleSelected.bind(null, info.id)}
          id={String(info.id)}
        >
          {(info as IgroupInfo)?.elements.map((i: Iinfo, iidx: number) =>
            renderGroup(i, idx, true)
          )}
        </KonvaGroup>
      );
    }
    if (type === 'image') {
      return (
        <KonvaImage
          key={info.id}
          banDrag={inGroup ? true : undefined}
          {...info}
          // @ts-ignore
          value={info.value}
          isNew={newId === info.id}
          onRef={onRef}
          stageRef={stageRef}
          //@ts-ignore
          isSelected={isSelectedId(selectedId, info.id as LayerIdType)}
          handleInfo={handleInfo.bind(null, idx)}
          handleSelected={handleSelected.bind(null, info.id as LayerIdType)}
          id={String(info.id)}
        />
      );
    }

    if (type === 'text') {
      return (
        <KonvaText
          key={info.id}
          banDrag={inGroup ? true : undefined}
          {...info}
          //@ts-ignore
          stageRef={stageRef}
          onRef={onRef}
          isNew={newId === info.id}
          //@ts-ignore
          isSelected={isSelectedId(selectedId, info.id as string)}
          handleInfo={handleInfo.bind(null, idx)}
          handleSelected={handleSelected.bind(null, info.id as string)}
          stageScale={stageScale}
          id={String(info.id)}
          resizeEnabled={false}
        />
      );
    }

    if (type === 'shape') {
      return (
        <KonvaShape
          key={info.id}
          banDrag={inGroup ? true : undefined}
          {...info}
          //@ts-ignore
          stageRef={stageRef}
          onRef={onRef}
          isNew={newId === info.id}
          // @ts-ignore
          isSelected={isSelectedId(selectedId, info.id)}
          handleInfo={handleInfo.bind(null, idx)}
          // @ts-ignore
          handleSelected={handleSelected.bind(null, info.id)}
          stageScale={stageScale}
          id={String(info.id)}
        />
      );
    }
    return null;
  };

  return (
    <div
      style={{
        ...backgroundStyle,
        transform: `scale(${stageScale})`,
      }}
      className="taki-canvas"
      ref={outRef}
      tabIndex={0}
    >
      <Stage
        width={width}
        height={height}
        ref={stageRef}
        // onClick={setSelected.bind(null, 0)}
      >
        <Layer key={-1}>
          <Rect
            width={width}
            height={height}
            x={0}
            y={0}
            onClick={onClickStage}
            fill={backgroundColor}
          />
        </Layer>
        <Layer key="content">
          {steps &&
            steps.map((info: Iinfo, idx: number) =>
              info ? (
                info.type === 'group' ? (
                  // @ts-ignore
                  <KonvaGroup
                    key={info.id}
                    type="group"
                    banDrag={false}
                    onRef={onRef}
                    stageRef={stageRef}
                    //@ts-ignore
                    isSelected={isSelectedId(selectedId, info.id as string)}
                    handleInfo={handleInfo.bind(null, idx)}
                    handleSelected={handleSelected.bind(
                      null,
                      info.id as string
                    )}
                    id={String(info.id)}
                  >
                    {/* @ts-ignore */}
                    {info?.elements?.map((i: Iinfo, iidx: number) =>
                      renderGroup(i, idx, true)
                    )}
                  </KonvaGroup>
                ) : (
                  renderGroup(info, idx)
                )
              ) : null
            )}
        </Layer>
      </Stage>
    </div>
  );
};

// 输出并下载图片
Core.exportToImage = (
  filename = 'stage.jpg',
  options: { scale?: number; quality?: number; fileType?: string } = {
    scale: 1,
    quality: 1,
  }
) => {
  const { scale = 1, quality = 1, fileType = 'image/png' } = options;
  // 先把Transformer去掉
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
        downloadURI(uri, FileName);
      }
    } catch (err) {
      console.log('err in exportToImage', err);
    }
  }, 100);
};

// 输出base64
Core.exportToBASE64 = () => {
  const { stageRef, setSelected } = outerInstance.value;
  // 先把Transformer去掉
  setSelected(0);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stageRef && stageRef.current) {
        const b64 = stageRef.current.toDataURL();
        resolve(b64);
      } else {
        reject();
      }
    }, 1000);
  });
};

// 输出文件类型
Core.exportToFile = (format = 'png', fileName) => {
  const { stageRef, setSelected } = outerInstance.value;
  function dataURLtoFile(dataurl: string, filename: string) {
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
    // 先把Transformer去掉
    setSelected(-1);
    const b64 = stageRef.current.toDataURL();
    return dataURLtoFile(b64, fileName + '.' + format);
  }
};

// 撤销
Core.withdraw = () => {
  const { setSteps } = outerInstance.value;
  if (stepCached && stepCached.canMoveBack) {
    stepCached.moveBack();
    const curr = stepCached.getCurrent();
    setSteps(curr);
  }
};

// 重做
Core.redo = () => {
  const { setSteps } = outerInstance.value;
  if (stepCached && stepCached.canMoveForward) {
    stepCached.moveForward();
    setSteps(stepCached.getCurrent());
  }
};

// 画布缩放
Core.canvasScale = (ratio: number) => {
  const { setStageScale } = outerInstance.value;
  // ratio属于[0.25,2]
  if (ratio <= 2.75 && ratio > 0) {
    setStageScale(ratio);
  }
};

// 删除选中元素
Core.deleteItem = () => {
  const { deleteItem } = outerInstance.value;
  deleteItem();
};

// 复制图层
Core.copyItem = () => {
  const { copyItem } = outerInstance.value;
  copyItem();
};

// 获取当前画布信息
Core.getInfo = () => {
  if (stepCached) {
    /* Removing some private properties of the step information
      (especially _ignore,_isProportionalScaling etc.)
       to reduce redundant data.
    */
    const unHandledInfos = stepCached.getCurrent();
    const result = unHandledInfos.map((info: any) => {
      const res = { ...info };
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
Core.moveLayerLevel = (i: number) => {
  const { moveLayerLevel } = outerInstance.value;
  moveLayerLevel(i);
};

// 将图层向四个方向移动像素
Core.moveLayer = (direction: string, delta: number) => {
  const { moveLayer } = outerInstance.value;
  moveLayer(direction, delta);
};

// 清空选项
Core.clearSelected = () => {
  const { setSelected } = outerInstance.value;
  setSelected(-1);
};

// 设置选中图层
Core.setSelectedIndex = (id: LayerIdType) => {
  const { setSelected } = outerInstance.value;
  setSelected(id);
};

// 多选图层开关
Core.toggleMultiSelected = (state: boolean) => {
  const { toggleMultiSelected } = outerInstance.value;
  toggleMultiSelected(state);
};

// 锁定/解锁某个图层
Core.toogleLock = (id: LayerIdType) => {
  const { setSteps } = outerInstance.value;
  if (stepCached) {
    const currentLayer = [...stepCached.getCurrent()];
    const index = currentLayer.findIndex((layer) => layer.id === id);
    const isBanDrag = currentLayer[index].banDrag;
    currentLayer[index].banDrag = !isBanDrag;
    setSteps(currentLayer);
  }
};
// // 成组
Core.madeGroup = (layers: any) => {
  const { madeGroup } = outerInstance.value;
  madeGroup(layers);
};

// 拆组
Core.divideGroup = (groupId: string) => {
  const { divideGroup } = outerInstance.value;
  divideGroup(groupId);
};
// 改变某个图层的某个属性
Core.changeLayerInfoById = (id: LayerIdType, item: object) => {
  const { changeLayerInfoById } = outerInstance.value;
  changeLayerInfoById(id, item);
};

export default Core;
