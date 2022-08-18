import { FC } from 'react';
import { IProps, IFunc } from './src/type';
interface ShapePropsNApi extends FC<IProps>, IFunc {}
declare const Shape: ShapePropsNApi;
export default Shape;
