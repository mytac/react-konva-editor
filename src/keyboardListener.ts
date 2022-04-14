import { createKeybindingsHandler } from 'tinykeys';

/*
快捷键需适配win系统和mac系统
删除：delete
复制：Ctrl+C；苹果系统Cmd+c
粘贴：Ctrl+V；苹果系统Cmd+v
撤销：Ctrl+Z；苹果系统Cmd+z
恢复：shift+ctrl+z
置顶：shift+ctrl+向上键
置底：shift+ctrl+向下键
多选移动：按住shift，可以加选文本/图片/商品，一起移动
*/

class KeyboardListener {
  handler: any;
  canvasInstance: any;
  constructor() {
    this.handler = undefined;
    this.canvasInstance = undefined;
  }

  init = (konvaCanvasPoint: any) => {
    this.canvasInstance = konvaCanvasPoint;
    if (!this.handler) {
      const handler = createKeybindingsHandler({
        Delete: () => {
          this.canvasInstance.deleteItem();
        },
        BackSpace: () => {
          this.canvasInstance.deleteItem();
        },
        '$mod+KeyV': (event) => {
          event.preventDefault();
          this.canvasInstance.copyItem();
        },
        '$mod+KeyZ': (event) => {
          event.preventDefault();
          this.canvasInstance.withdraw();
        },
        '$mod+Shift+KeyZ': (event) => {
          event.preventDefault();
          this.canvasInstance.redo();
        },
        '$mod+Shift+ArrowUp': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer(1);
        },
        '$mod+Shift+ArrowDown': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer(-1);
        },
      });
      this.handler = handler;
    }
  };

  listening = (target: any) => {
    target.addEventListener('keydown', this.handler);
  };

  destory = (target: any) => {
    target.removeEventListener('keydown', this.handler);
    this.handler = undefined;
  };
}

export default KeyboardListener;
