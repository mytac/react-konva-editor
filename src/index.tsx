import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Group } from 'react-konva';
import Konva from 'konva';
import { IProps, Iinfo, IaddItem, IFunc, IcommonInfo } from './type';
import withTransform from './hoc/withTransform';
import MyImage from './KonvaImg';
import MyText from './KonvaText';
import { handleDuplicateId, downloadURI } from './utils/utils';
import circularQueue from './utils/circularQueue';
import KeyboardListener from './keyboardListener';
// @ts-ignore
const KonvaImage = withTransform(MyImage);
// @ts-ignore
const KonvaText = withTransform(MyText);
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

const Shape: ShapePropsNApi = ({
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
  const [selectedId, setSelected] = useState<number>(0);
  const [steps, setSteps] = useState<any>([]);
  const [stageScale, setStageScale] = useState(0.7);

  // 添加新元素时
  const onAdd = (item: IaddItem) => {
    if (stepCached) {
      const currentItem = stepCached.getCurrent();
      if (currentItem) {
        const infos: Iinfo[] = currentItem;
        const newItem = { ...item, id: 0 };
        const maxId = infos.reduce(
          (prev, info) =>
            info && info.id ? Math.max(Number(info.id), prev) : prev + 100,
          0
        );
        const newId = maxId ? maxId + 1 : 1000;
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
  const handleInfo = (index: number, item: object) => {
    if (stepCached) {
      const infos: Iinfo[] = stepCached.getCurrent();
      const current = stepCached.getCurrent()[index];
      const newInfo = { ...current, ...item };
      const ins = [...infos];
      ins[index] = newInfo;
      stepCached.enqueue(ins);
      setSteps(stepCached.getCurrent());
    }
  };

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
        if (stepCached) {
          const infos = stepCached.getCurrent();
          const properties = {
            ...item,
            ...selectedItemChange,
          };

          if (properties._ignore === true) {
            // 不入队，替换当前指针所指元素，并清空current之后的对内元素
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
          const newSteps = stepCached.getCurrent();
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
        // @ts-ignore
        cb(item);
      } else {
        if (Array.isArray(steps)) {
          const idx = steps.findIndex((i: any) => i?.id === selectedId);
          if (idx > -1) {
            const item = steps[idx];
            // @ts-ignore
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
    hotkeyListener.init(Shape);
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
      handleSelectItem((item: IcommonInfo | undefined) => {
        if (item && item.type !== 'stage') {
          onChangeSelected(item);
        }
      });
    }
    onChangeStep(steps);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    if (selectedId > -1) {
      handleSelectItem((item: Iinfo | undefined) => {
        if (item) {
          onChangeSelected(item);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const onClickStage = (e: any) => {
    setSelected(-1);
  };

  const handleSelected = (selectedId: number, ref: any) => {
    setSelected(selectedId);
    if (ref && ref.current) {
      bindRef(ref.current);
    }
  };

  const copyItem = useCallback(() => {
    handleSelectItem((item: any, index = 0) => {
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
    if (selectedId >= 1000) {
      handleSelectItem((item: any, index = -1) => {
        if (item) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, steps]);

  const moveLayer = useCallback(
    (i: number) => {
      const current = [...steps];
      let isChanged = false;
      handleSelectItem((item: any, currentLayerIndex = -1) => {
        if (item && item.type === 'stage') {
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

  useEffect(() => {
    outerInstance.attach('stageRef', stageRef);
    outerInstance.attach('setSelected', setSelected);
    outerInstance.attach('setStageScale', setStageScale);
    outerInstance.attach('setSteps', setSteps);
  }, []);

  useEffect(() => {
    outerInstance.attach('deleteItem', deleteItem);
  }, [deleteItem]);

  useEffect(() => {
    outerInstance.attach('copyItem', copyItem);
  }, [copyItem]);

  useEffect(() => {
    outerInstance.attach('moveLayer', moveLayer);
  }, [moveLayer]);

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
        <Layer>
          {steps &&
            steps.map((info: Iinfo, idx: number) =>
              info ? (
                <Group key={info.id}>
                  {info.type === 'image' ? (
                    <KonvaImage
                      {...info}
                      // @ts-ignore
                      value={info.value}
                      isNew={newId === info.id}
                      onRef={onRef}
                      stageRef={stageRef}
                      isSelected={info.id === selectedId}
                      handleInfo={handleInfo.bind(null, idx)}
                      handleSelected={handleSelected.bind(null, info.id)}
                      id={String(info.id)}
                    />
                  ) : (
                    <KonvaText
                      {...info}
                      //@ts-ignore
                      stageRef={stageRef}
                      onRef={onRef}
                      isNew={newId === info.id}
                      isSelected={info.id === selectedId}
                      handleInfo={handleInfo.bind(null, idx)}
                      handleSelected={handleSelected.bind(null, info.id)}
                      stageScale={stageScale}
                      id={String(info.id)}
                    />
                  )}
                </Group>
              ) : null
            )}
        </Layer>
      </Stage>
    </div>
  );
};

// 输出并下载图片
Shape.exportToImage = (filename = 'stage.jpg') => {
  // 先把Transformer去掉
  const { stageRef, setSelected } = outerInstance.value;
  setSelected(0);
  setTimeout(() => {
    if (stageRef && stageRef.current) {
      const uri = stageRef.current.toDataURL();
      downloadURI(uri, filename);
    }
  }, 100);
};

// 输出base64
Shape.exportToBASE64 = () => {
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
Shape.exportToFile = (format = 'png', fileName) => {
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
    setSelected(0);
    const b64 = stageRef.current.toDataURL();
    return dataURLtoFile(b64, fileName + '.' + format);
  }
};

// 撤销
Shape.withdraw = () => {
  const { setSteps } = outerInstance.value;
  if (stepCached && stepCached.canMoveBack) {
    stepCached.moveBack();
    const curr = stepCached.getCurrent();
    setSteps(curr);
  }
};

// 重做
Shape.redo = () => {
  const { setSteps } = outerInstance.value;
  if (stepCached && stepCached.canMoveForward) {
    stepCached.moveForward();
    setSteps(stepCached.getCurrent());
  }
};

// 画布缩放
Shape.canvasScale = (ratio: number) => {
  const { setStageScale } = outerInstance.value;
  // ratio属于[0.25,2]
  if (ratio <= 2.75 && ratio > 0) {
    setStageScale(ratio);
  }
};

// 删除选中元素
Shape.deleteItem = () => {
  const { deleteItem } = outerInstance.value;
  deleteItem();
};

// 复制图层
Shape.copyItem = () => {
  const { copyItem } = outerInstance.value;
  copyItem();
};

// 获取当前画布信息
Shape.getInfo = () => {
  if (stepCached) {
    /* Removing some private properties of the step information
      (especially _ignore,_isProportionalScaling etc.)
       to reduce redundant data.
    */
    const unHandledInfos = stepCached.getCurrent();
    const result = unHandledInfos.map((info: any) => {
      const res = { ...info };
      delete res._isProportionalScaling;
      delete res._ignore;
      delete res._isAdaptStage;
      return res;
    });
    return result;
  }
};

// i正数往上移动，负数往下移动
Shape.moveLayer = (i: number) => {
  const { moveLayer } = outerInstance.value;
  moveLayer(i);
};

// 清空选项
Shape.clearSelected = () => {
  const { setSelected } = outerInstance.value;
  setSelected(-1);
};

// 设置选中图层
Shape.setSelectedIndex = (id: number) => {
  const { setSelected } = outerInstance.value;
  setSelected(id);
};

// 锁定/解锁某个图层
Shape.toogleLock = (id: number) => {
  const { setSteps } = outerInstance.value;
  if (stepCached) {
    const currentLayer = [...stepCached.getCurrent()];
    const index = currentLayer.findIndex((layer) => layer.id === id);
    const isBanDrag = currentLayer[index].banDrag;
    currentLayer[index].banDrag = !isBanDrag;
    setSteps(currentLayer);
  }
};

export default Shape;
