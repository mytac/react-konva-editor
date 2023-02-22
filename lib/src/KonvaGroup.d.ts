import { FC, ReactNode } from 'react';
import { IShapeInfo } from './type';
interface GroupInterface extends IShapeInfo {
    children: ReactNode;
}
declare const KonvaGroup: FC<GroupInterface>;
export default KonvaGroup;
