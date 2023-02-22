"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class circularQueue {
    constructor(size, defaultElement = []) {
        this.list = [];
        this.front = 0;
        this.tail = 0;
        this.length = 0;
        this.current = 0;
        this.clearAfterCurrent = () => {
            let i = this.current;
            const length = this.length;
            while ((i + 1) % length !== this.tail) {
                const clearIndex = (i + 1) % length;
                this.list[clearIndex] = undefined;
                i = clearIndex;
            }
            this.tail = (this.current + 1) % this.length;
        };
        this.enqueue = (item) => {
            if (this.isFull() && (this.current + 1) % this.length !== this.tail) {
                this.clearAfterCurrent();
            }
            if (this.isFull()) {
                this.tail = (this.current + 1) % this.length;
                this.front = (this.front + 1) % this.length;
            }
            this.list[this.tail] = item;
            this.current = this.tail;
            this.tail = (this.tail + 1) % this.length;
        };
        this.isEmpty = () => {
            return typeof this.list[this.front] === 'undefined';
        };
        this.isFull = () => {
            return (this.front === this.tail && typeof this.list[this.front] !== 'undefined');
        };
        this.getCurrent = () => {
            return this.list[this.current];
        };
        this.moveForward = () => {
            if (this.canMoveForward) {
                this.current = this.isFull()
                    ? (this.current + 1 + this.length) % this.length
                    : this.current + 1;
            }
        };
        this.moveBack = () => {
            if (this.canMoveBack) {
                this.current = this.isFull()
                    ? (this.current - 1 + this.length) % this.length
                    : this.current - 1;
            }
        };
        this.print = () => {
            let i = 0;
            let p = this.front;
            while (i < this.length) {
                p = (p + 1) % this.length;
                i++;
            }
        };
        this.clear = () => {
            this.length = 0;
            this.front = 0;
            this.current = 0;
            this.list = [];
            this.tail = 0;
        };
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
    dequeue() { }
}
exports.default = circularQueue;
