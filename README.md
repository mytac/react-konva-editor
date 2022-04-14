# react-konva-editor
An image editor which is built by konva and react.

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
## reference
1. [build reference](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)
