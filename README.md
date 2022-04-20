# react-konva-editor
An image editor which is built by konva and react.



```jsx
 const stepInfo = [
    {type:'text',value:'hello',x:10,y:10,color:'red'},
  ]

// ...
<ReactKonvaEditor
           backgroundStyle={{
                backgroundColor: '#F1F3F7',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              width={500}
              height={500}
              backgroundColor="#fff"
              maxStep={10}
              stepInfo={stepInfo}
      />
```

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

## Todos
序号|内容|完成情况
-|-|-|
1|js环境调通|√
2|ts type规范化|-
3|ts环境调通|-
4|依赖库配置|-
5|使用文档|-
6|线上示例|-

Setup automated build with Travis
Analyze code-coverage with Codecov
Add badges to your readme with Shields. Everyone loves badges 😎