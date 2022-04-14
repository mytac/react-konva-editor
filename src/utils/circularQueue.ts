class circularQueue {
  private list: any[] = [];
  private front: number = 0;
  private tail: number = 0;
  public length: number = 0;
  public current: number = 0;

  constructor(size: number, defaultElement = []) {
    this.length = size;
    this.front = 0;
    this.current = 0;
    this.list = new Array(size);
    this.list[0] = defaultElement;
    this.tail = 1;
  }

  get canMoveForward() {
    return !this.isEmpty() && (this.current + 1) % this.length !== this.tail;
  }
  get canMoveBack() {
    return this.current !== this.front;
  }

  // 清空current之后的元素
  clearAfterCurrent = () => {
    let i = this.current;
    const length = this.length;

    while ((i + 1) % length !== this.tail) {
      const clearIndex = (i + 1) % length;
      this.list[clearIndex] = undefined;
      i = clearIndex;
    }
    this.tail = (this.current + 1) % this.length;
  };

  // 入队
  enqueue = (item: any) => {
    // 当入队时current不是处于队尾指针的前驱时，需要清空current到队尾之间的所有元素，并重置尾指针
    if (this.isFull() && (this.current + 1) % this.length !== this.tail) {
      this.clearAfterCurrent();
    }

    if (this.isFull()) {
      this.tail = (this.current + 1) % this.length;
      // 满了移动头指针
      this.front = (this.front + 1) % this.length;
    }
    // const index = this.tail % this.length;
    this.list[this.tail] = item;
    this.current = this.tail;
    this.tail = (this.tail + 1) % this.length;
  };

  // 不涉及
  dequeue() {}

  isEmpty = () => {
    return typeof this.list[this.front] === 'undefined';
  };

  isFull = () => {
    return (
      this.front === this.tail && typeof this.list[this.front] !== 'undefined'
    );
  };

  getCurrent = () => {
    return this.list[this.current];
  };

  // 改变当前current指向的
  // changeCurrent() {

  // }

  // 往右移一步 （尾指针方向）
  moveForward = () => {
    if (this.canMoveForward) {
      this.current = this.isFull()
        ? (this.current + 1 + this.length) % this.length
        : this.current + 1;
    }
  };
  // 往左移一步 （头指针方向）
  moveBack = () => {
    if (this.canMoveBack) {
      this.current = this.isFull()
        ? (this.current - 1 + this.length) % this.length
        : this.current - 1;
    }
  };

  print = () => {
    let i = 0;
    let p = this.front;
    while (i < this.length) {
      p = (p + 1) % this.length;
      i++;
    }
  };

  // 清空当前队列中所有内容
  clear = () => {
    this.length = 0;
    this.front = 0;
    this.current = 0;
    this.list = [];
    this.tail = 0;
  };
}

export default circularQueue;
