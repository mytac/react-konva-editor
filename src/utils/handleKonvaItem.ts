const handleKonvaItem = (konvaNode: any) => {
  // const { attrs, textWidth, textHeight } = konvaNode;
  const { attrs } = konvaNode;
  const {
    scaleX = 1,
    scaleY = 1,
    rotation,
    skewX,
    skewY,
    x = 0,
    y = 0,
    type,
  } = attrs;
  const otherProperty: any = {};
  if (type === 'text') {
    otherProperty.x = Math.round(x);
    otherProperty.y = Math.round(y);
    // otherProperty.w = Math.round(textWidth * scaleX);
    // otherProperty.h = Math.round(textHeight * scaleY);
  }

  return {
    scaleX,
    scaleY,
    rotation,
    skewX,
    skewY,
    x,
    y,
    ...otherProperty,
  };
};

export default handleKonvaItem;
