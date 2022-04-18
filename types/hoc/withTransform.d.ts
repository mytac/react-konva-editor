import { FC } from 'react';
declare const withTransform: (Component: FC) => (props: {
    isSelected: boolean;
    handleInfo: (a: any) => void;
    handleSelected: (ref: any) => void;
    rotation?: number | undefined;
    opacity?: number | undefined;
    banDrag?: boolean | undefined;
    type?: "image" | "text" | undefined;
}) => JSX.Element;
export default withTransform;
