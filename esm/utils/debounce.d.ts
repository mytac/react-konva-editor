declare const debounce: (callback?: (a?: any, b?: any) => void, time?: number) => (...params: any[]) => void;
export default debounce;
