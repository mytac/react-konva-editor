"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleKonvaItem = (konvaNode) => {
    const { attrs } = konvaNode;
    const { scaleX = 1, scaleY = 1, rotation, skewX, skewY, x = 0, y = 0, type, } = attrs;
    const otherProperty = {};
    console.log('x', x);
    console.log('y', y);
    if (type === 'text') {
        otherProperty.x = Math.round(x);
        otherProperty.y = Math.round(y);
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
exports.default = handleKonvaItem;
