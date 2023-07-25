# react-konva-editor

使用`react`和`konva`开发的图像编辑器底层组件，纯数据驱动，无副作用！
可以与[react-konva-editor-kit](https://github.com/mytac/react-konva-editor-kit)(包含一系列图像、文字的编辑控件)共同使用。

## 安装方式

```
$ npm install react-konva-editor
```

或

```
$ yarn add react-konva-editor
```

## 使用方法

```tsx
<KonvaCanvas
  backgroundStyle={{
    backgroundColor: '#F1F3F7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  onChangeSelected={store.setSelected}
  width={store.width}
  height={store.height}
  backgroundColor={store.backgroundColor}
  addItem={addedItem}
  selectedItemChange={changedItem}
  maxStep={10}
  setWithdraw={setWithdraw}
  setRedo={setRedo}
  bindRef={store.setCurrentRef}
  stepInfo={stepInfo}
  onChangeStep={onChangeStep}
/>
```

## Props

| propName           | type                      | required | description                                                |
| ------------------ | ------------------------- | -------- | ---------------------------------------------------------- |
| backgroundStyle    | `Object`                  | √        | 画布背景样式                                               |
| width              | `number`                  | √        | 画布宽                                                     |
| height             | `number`                  | √        | 画布高                                                     |
| backgroundColor    | `string`                  | -        | 画布颜色（默认为`#fff`）                                   |
| addItem            | `ItemProp`                | -        | 需在画布上新增元素时，需要改变`addItem`                    |
| onChangeSelected   | `(ItemProp)=>void`        | √        | 在画布上选中元素时触发的回调函数，会接收当前选中的元素信息 |
| selectedItemChange | `Object`                  | -        | 改变选中图层的属性                                         |
| maxStep            | `number`                  | -        | 存储操作队列最大缓存步数                                   |
| stepInfo           | `Array\<ItemProp>`        | √        | 画布上所有元素的信息，是一个数组                           |
| bindRef            | (ReactRef)=>void          | √        | 绑定外层 ref 的函数                                        |
| setWithdraw        | ()=>void                  | -        | 撤销操作的回调函数                                         |
| setRedo            | ()=>void                  | -        | 重做操作的回调函数                                         |
| onChangeStep       | (Array\<ItemProp> )=>void | √        | 画布上任意改变，会触发该函数，返回当前画布信息             |

### StepInfo

#### example

```json
[
  {
    "type": "shape",
    "value": "star",
    "fill": "red",
    "id": 1001,
    "scaleX": 1,
    "scaleY": 1,
    "rotation": 0,
    "skewX": 0,
    "skewY": 0,
    "x": 195,
    "y": 345
  },
  {
    "type": "text",
    "value": "可定义内外径、角数量",
    "fontFamily": "默认",
    "id": 1002,
    "scaleX": 1.1925926495341033,
    "scaleY": 1.192592649534104,
    "rotation": 0,
    "skewX": 0,
    "skewY": 0,
    "x": 63,
    "y": 168,
    "fontSize": 25
  },
  {
    "type": "image",
    "value": "https://image.yonghuivip.com/jimu/1/1638943345035942610",
    "elementName": "上传人",
    "id": 1003,
    "x": 19,
    "y": 436,
    "width": 400,
    "height": 400,
    "scaleX": 1,
    "scaleY": 1,
    "rotation": 0,
    "skewX": 0,
    "skewY": 0
  }
]
```

![demo](https://s1.ax1x.com/2023/07/25/pCXJyW9.png)

### ItemProp

TODO...

## API

| API name            | type                                                                      | description                                                                |
| ------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| exportToImage       | (fileName:string,options?:[ImageExportProps](#ImageExportProps))=>void    | 根据当前画布信息输出并下载图片，可定制名称和参数                           |
| exportToBASE64      | ()=>void                                                                  | 根据当前画布信息输出 BASE64                                                |
| withdraw            | ()=>void                                                                  | 撤销操作，画布信息回退上一步操作                                           |
| redo                | ()=>void                                                                  | 重做操作，画布信息前移一步操作                                             |
| canvasScale         | (ratio:number)=>void                                                      | 缩放当前画布大小 倍数范围：(0,2.75])                                       |
| deleteItem          | ()=>void                                                                  | 删除当前画布上选中的元素                                                   |
| moveLayerLevel      | `(i: number)=>void`                                                       | 当 i 小于 0 时，当前选中元素下移图层；当 i 大于 0 时，当前选中元素上移图层 |
| moveLayer           | `(direction: 'right' \| 'left' \| 'top'\| 'bottom', delta: number)=>void` | 根据方向参数移动当前选中的元素                                             |
| setSelectedIndex    | `(id:number)=>void`                                                       | 根据层级关系选中某个元素                                                   |
| clearSelected       | `()=>void`                                                                | 清空选中状态                                                               |
| toggleMultiSelected | `(state:boolean)=>void`                                                   | 切换多选模式（长按空格打开多选模式，松开关闭）                             |
| toogleLock          | `(index:number)=>void`                                                    | 切换图层锁定状态                                                           |
| madeGroup           | `(layers:Array\<ItemProp>)=>void`                                         | 对选中的图层进行成组（多选模式下）                                         |
| divideGroup         | `(groupId:string)=>void`                                                  | 根据 groupId 拆开图层组                                                    |

<h3 id="ImageExportProps">ImageExportProps </h3>

| propName | type                          | required | description                        |
| -------- | ----------------------------- | -------- | ---------------------------------- |
| scale    | `number[0.1-3]`               | -        | 图像尺寸缩放倍数（默认为 1）       |
| quality  | `number [0.1-1]`              | -        | 输出图像的质量(默认为 11)          |
| fileType | `'image/png' \| 'image/jpeg'` | -        | 输出图像格式(默认为`'image/png'` ) |

## Timeline

23-2-20 支持多选图层，拆组和解组-可配合 toolkit 使用

## Tips

1. 如何开启/关闭多选图层模式？

```tsx
const handler = useCallback((e: KeyboardEvent) => {
  if (e.keyCode === 16) {
    // 开启多选模式
    KonvaCanvas.toggleMultiSelected(true);
    store.setMultiSelected(true);
  }
}, []);

useEffect(() => {
  window.addEventListener('keydown', handler);
  return () => {
    window.removeEventListener('keydown', handler);
  };
}, []);
```

## reference

1. [build reference](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)
2. [react-konva](https://github.com/konvajs/react-konva)

## Todos

| 序号 | 内容           | 完成情况 |
| ---- | -------------- | -------- |
| 1    | js 环境调通    | √        |
| 2    | ts type 规范化 | delay    |
| 3    | ts 环境调通    | √        |
| 4    | 依赖库配置     | delay    |
| 5    | 使用文档       | ing      |
| 6    | 线上示例       | -        |
