"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lodash_1 = require("lodash");
const react_konva_1 = require("react-konva");
const KonvaShape = ({ stageRef, myRef, setShowTransformer, handleSelected, handleInfo, onRef, banDrag, trRef, isSelected, fill, value, id, width = 100, height = 30, ...props }) => {
    (0, react_1.useEffect)(() => {
        if (isSelected && trRef?.current) {
            trRef.current.nodes([myRef.current]);
        }
    }, [isSelected, trRef, myRef]);
    const commonProps = {
        id: String(id),
        ref: myRef,
        onClick: banDrag ? lodash_1.noop : handleSelected,
        ...props,
    };
    if (value === 'rect') {
        return ((0, jsx_runtime_1.jsx)(react_konva_1.Rect, { fill: fill, width: width, height: height, ...commonProps }));
    }
    if (value === 'circle') {
        const { radius } = props;
        return (0, jsx_runtime_1.jsx)(react_konva_1.Circle, { fill: fill, radius: radius, ...commonProps });
    }
    if (value === 'arc') {
        const { innerRadius = 100, outerRadius = 60, angle = 180 } = props;
        return ((0, jsx_runtime_1.jsx)(react_konva_1.Arc, { fill: fill, innerRadius: innerRadius, outerRadius: outerRadius, angle: angle, ...commonProps }));
    }
    if (value === 'star') {
        const { innerRadius = 50, outerRadius = 100, numPoints = 5 } = props;
        return ((0, jsx_runtime_1.jsx)(react_konva_1.Star, { fill: fill, numPoints: numPoints, innerRadius: innerRadius, outerRadius: outerRadius, ...commonProps }));
    }
    if (value === 'arrow') {
        const { points = [0, 0, 50, 50] } = props;
        return ((0, jsx_runtime_1.jsx)(react_konva_1.Arrow, { stroke: fill, fill: fill, points: points, pointerLength: 10, pointerWidth: 20, ...commonProps }));
    }
    if (value === 'ellipse') {
        const { ellipseRadius = { radiusX: 40, radiusY: 20 } } = props;
        return (0, jsx_runtime_1.jsx)(react_konva_1.Ellipse, { ...ellipseRadius, fill: fill, ...commonProps });
    }
    return null;
};
exports.default = KonvaShape;
