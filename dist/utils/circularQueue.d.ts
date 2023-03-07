declare class circularQueue {
    private list;
    private front;
    private tail;
    length: number;
    current: number;
    constructor(size: number, defaultElement?: never[]);
    get canMoveForward(): boolean;
    get canMoveBack(): boolean;
    clearAfterCurrent: () => void;
    enqueue: (item: any) => void;
    dequeue(): void;
    isEmpty: () => boolean;
    isFull: () => boolean;
    getCurrent: () => any;
    moveForward: () => void;
    moveBack: () => void;
    print: () => void;
    clear: () => void;
}
export default circularQueue;
//# sourceMappingURL=circularQueue.d.ts.map