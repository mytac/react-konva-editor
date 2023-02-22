import React, { FC, useState, useEffect } from 'react';
import { Text } from 'react-konva';
import { SelectChangeListener } from './utils/textHandler';
import { ItextInfo } from './type';

const KonvaText: FC<ItextInfo> = ({
  stageRef,
  myRef,
  setShowTransformer,
  handleSelected,
  handleInfo,
  onRef,
  isNew,
  stageScale,
  // @ts-ignore
  trRef,
  ...props
}) => {
  const [showText, setShowText] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gradient, setGradient] = useState<any>({});

  const changeGardient = (
    allWidth: number,
    a: number,
    b: number,
    total: number,
  ) => {
    console.log('allWidth', allWidth);
    // const EveryWidth = allWidth / total;
    const targetColor = 'yellow';
    const originColor = props.color || '#000';
    const start = a >= b ? b : a;
    const end = a > b ? a : b;
    const split = [start / total, end / total];
    const obj = {
      fill: 'red',
      // fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientStartPoint: {
        x: 0,
        // x: start * EveryWidth * stageScale,
        y: 0,
      },
      // fillLinearGradientEndPoint: { x: end * EveryWidth * stageScale, y: 0 },
      fillLinearGradientEndPoint: { x: allWidth, y: 0 },
      fillPatternRepeat: 'repeat-x',
      // fillLinearGradientEndPoint: { x: 100, y: 0 },
      fillLinearGradientColorStops: [
        0,
        originColor,
        split[0],
        originColor,
        split[0],
        targetColor,
        split[1],
        targetColor,
        split[1],
        originColor,
        1,
        originColor,
      ],
    };
    console.log('obj', obj);
    setGradient(obj);
  };

  const onDblClick = (e: any) => {
    const textNode = myRef.current;
    const originalText = textNode.text();
    if (!textNode) return;

    const transformerBoxAttr = trRef.current.children?.[0].attrs;

    const stageBox = stageRef.current.container().getBoundingClientRect();
    const areaPosition = {
      x: stageBox.x + (props.x || 0) * stageScale,
      y: stageBox.y + (props.y || 0) * stageScale,
    };

    setShowText(false);
    const textarea = document.createElement('textarea');
    setShowTransformer(false);
    document.body.appendChild(textarea);

    textarea.value = originalText;
    const scaleX = textNode.attrs.scaleX || 1;
    const originFontSize = props.fontSize || 40;
    const transformedFontSize = originFontSize * scaleX * stageScale;

    textarea.style.position = 'fixed';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    const realWidth =
      transformerBoxAttr.width * stageScale - textNode.padding() * 2;
    const realHeight =
      transformerBoxAttr.height * stageScale - textNode.padding() * 2 + 'px';
    textarea.style.width = realWidth + 'px';
    textarea.style.height = realHeight;

    const selectChanger = new SelectChangeListener(
      textarea,
      originalText,
      changeGardient,
      realWidth,
    );
    //@ts-ignore
    textarea.style.fontSize = transformedFontSize + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    // textarea.style.whiteSpace = 'nowrap';

    textarea.style.outline = 'none';
    textarea.style.zIndex = '100';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    const textAreaFontStyle = textNode.fontStyle();
    const textDecoration = textNode.textDecoration();
    if (textAreaFontStyle.includes('italic')) {
      textarea.style.fontStyle = 'italic';
    }
    if (textAreaFontStyle.includes('bold')) {
      textarea.style.fontWeight = 'bold';
    }

    if (textDecoration.includes('underline')) {
      textarea.style.textDecoration = 'underline';
    }
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    selectChanger.listen();
    let rotation = textNode.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg) ';
    }

    let px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(textNode.fontSize() / 20);
    }
    transform += 'translateY(-' + px + 'px) ';
    textarea.style.transform = transform;
    // reset height
    // textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    // textarea.style.height = textarea.scrollHeight + 3 + 'px';

    textarea.focus();

    function removeTextarea() {
      try {
        if (textarea) {
          document.body.removeChild(textarea);
          setShowText(true);
          selectChanger.destory();
        }
      } catch (err) {
        console.log(err);
      }
    }

    function setTextareaWidth(newWidth: number) {
      try {
        if (!newWidth) {
          // set width for placeholder
          newWidth = textNode.placeholder.length * transformedFontSize;
        }
        // some extra fixes on different browsers
        const isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent,
        );
        const isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || isFirefox) {
          newWidth = Math.ceil(newWidth);
        }
        // @ts-ignore
        const isEdge =
          // @ts-ignore
          document.documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
          newWidth += 1;
        }
        textarea.style.width = newWidth + 'px';
      } catch (err) {
        console.log('err in konvatext', err);
      }
    }

    textarea.addEventListener('keydown', function (e: any) {
      if (setShowTransformer) {
        setShowTransformer(false);
      }
      if (e.keyCode === 27) {
        removeTextarea();
      }

      const scale = textNode.getAbsoluteScale().x;
      textNode.text(textarea.value);
      handleInfo({ value: textarea.value });
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height =
        textarea.scrollHeight + transformedFontSize + 'px';
      e.stopPropagation();
    });

    textarea.addEventListener('blur', function () {
      setShowTransformer(true);
      handleInfo({ value: textarea.value });

      removeTextarea();
    });
  };

  useEffect(() => {
    if (myRef && myRef.current) {
      const el = myRef.current;
      if (showText) {
        el.show();
      } else {
        el.hide();
      }
    }
  }, [myRef, showText]);

  // 不知道产品要不要，先保留吧，产品与设计有argue，这段代码会造成文字闪现，从x=0，y=0，跳到当前位置，体验不好
  // useEffect(() => {
  //   if (isNew && stageRef && myRef) {
  //     // 如果是新增元素，需要将元素置于画布中央
  //     const stage = stageRef.current;
  //     const textNode = myRef.current;

  //     const stageW = stage.getWidth();
  //     const stageH = stage.getHeight();

  //     const textW = textNode.getWidth();
  //     const textH = textNode.getHeight();

  //     const areaPosition = {
  //       x: (stageW - textW) / 2,
  //       y: (stageH - textH) / 2,
  //     };

  //     handleInfo(areaPosition);
  //   }
  // }, [isNew, stageRef, myRef, handleInfo]);

  useEffect(() => {
    if (onRef) {
      onRef(myRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   handleInfo({ gradient });
  //   // eslint-dissable-next-line react-hooks/exhaustive-deps
  // }, [gradient]);

  return (
    <>
      <Text
        text={props.value}
        ref={myRef}
        onDblClick={onDblClick}
        // @ts-ignore
        onClick={handleSelected}
        fontSize={40}
        // fill="#000"
        {...props}
        fillAfterStrokeEnabled
        // fillPriority="linear-gradient"
        // fill={Object.keys(gradient) ? undefined : '#000'}
        value={undefined}
        lineJoin="round"
        // globalCompositeOperation="destination-in"
        // {...gradient}

        // fontStyle="italic bold" // "italic"
        // align="center"
        // x={0}
        // visible
      />
    </>
  );
};

export default KonvaText;
