"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lodash_1 = require("lodash");
const react_konva_1 = require("react-konva");
const KonvaGroup = ({ stageRef, myRef, setShowTransformer, handleSelected, handleInfo, onRef, banDrag, trRef, isSelected, fill, value, id, width = 100, height = 30, ...props }) => {
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
    if (props?.children) {
        return ((0, jsx_runtime_1.jsx)(react_konva_1.Group, { ...commonProps, children: react_1.Children.map(props.children, (child) => child) }));
    }
    return null;
};
exports.default = KonvaGroup;
