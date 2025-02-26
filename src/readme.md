```tsx
<KonvaCanvas
  width="1200px"
  height="800px"
  onStepBack={() => {}} // 撤销
  onStepForward={() => {}} // 重做
  onScale={(a: number) => {}} // 缩放倍率 a[10,200]
  addItem={KonvaItem} // 见下
  onDel={(id: number) => {}}
  saveImg={} //生成图片
  saveData={} // 存储信息
/>
```

## KonvaItem

```
{
  type:'img'|'text',
  value:'' 是图片就传地址，文本类型就写个默认值
}
```

## props

## 更新

增加文字特效组

## 字段说明

### 通用字段

| 字段          | 类型          | 必填    | 含义                                                 |
| ------------- | ------------- | ------- | ---------------------------------------------------- | -------- |
| id            | String        | √       | 唯一标识符                                           |
| type          | `"image"      | "text"` | √                                                    | 图层类型 |
| elementName   | string        | √       | 图层名称                                             |          |
| x             | number        |         | 水平位置定位（以画布左上角为原点）默认为 0           |
| y             | number        |         | 垂直位置定位（以画布左上角为原点）默认为 0           |
| opacity       | number [0,1]  |         | 图层透明度，默认为 1                                 |
| scaleX        | number        |         | 水平方向缩放倍率，默认：1；负数时向 x 轴的负方向缩放 |
| scaleY        | number        |         | 垂直方向缩放倍率，默认：1；负数时向 y 轴的负方向缩放 |
| rotation      | number        |         | 顺时针旋转角度                                       |
| shadowOffsetX | number        |         | 阴影水平偏移                                         |
| shadowOffsetY | number        |         | 阴影垂直偏移                                         |
| shadowColor   | string        |         | 阴影颜色                                             |
| shadowBlur    | number [0,40] |         | 投影模糊扩散                                         |
| shadowOpacity | number [0,1]  |         | 投影透明度度                                         |
| stroke        | string        |         | 描边颜色                                             |
| strokeWidth   | number        |         | 描边宽度                                             |
| shadowOpacity | number        |         | 阴影透明度                                           |

### 图像类型字段

type 为 image 时

| 字段   | 类型        | 必填 | 含义     |
| ------ | ----------- | ---- | -------- |
| width  | number      | √    | 图像宽度 |
| height | number      | √    | 图像高度 |
| value  | string      | √    | 图像链接 |
| crop   | `CropProps` |      | 剪裁参数 |
| skewX  | number      |      |
| skewY  | number      |      |

#### CropProps

| 字段         | 类型   | 必填 | 含义             |
| ------------ | ------ | ---- | ---------------- |
| originWidth  | number | √    | 原始图片宽度     |
| originHeight | number | √    | 原始图片高度     |
| width        | number | √    | 剪裁宽度         |
| height       | number | √    | 剪裁高度         |
| unit         | `px`   | √    | 单位，必须写"px" |
| x            | number | √    | 剪裁框水平定位   |
| y            | number | √    | 剪裁框水平定位   |

### 文字类型参数

type 为 text 时
| 字段 | 类型 | 必填 | 含义 |
| ----------- | -------- | ------- | -------------------------------------------------------- | -------- |
value|string|√ |文本
color|string ||文本颜色，默认为`#000`
fontSize|number||字体大小
fill|string||字体颜色，这里 hexcode 必须为 8 位，如："#f800004d"，最后两位为透明度，具体转换规则见下
| fontStyle | `'bold' | 'italic' |'bold italic' ` | | 加粗 "bold" 斜体"italic" 二者的任意排列组合 |
| textDecoration |`'underline' | 'line-through' |'underline line-through' ` | | 下划线 "underline" 贯穿线"line-through" 二者的任意排列组合 |
align|`'left' | 'right' | 'center'`||对齐方式，默认左对齐

#### hexcode 转换规则

alpha 为透明度，当 alpha 为 0 时彻底透明；

```
hexcode最后两位 = alpha < 0.01 ? '00' : Math.round(255 * alpha).toString(16)
```

### reference

1. [text-shadow](https://www.w3.org/Style/Examples/007/text-shadow.zh_CN.html)
