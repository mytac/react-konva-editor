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
  multiHandlerOn: any;
  multiHandlerOff: any;
  constructor() {
    this.handler = undefined;
    this.canvasInstance = undefined;
    this.multiHandlerOn = undefined;
    this.multiHandlerOff = undefined;
  }

  init = (konvaCanvasPoint: any) => {
    console.log('init');
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
        ArrowUp: (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('y', -1);
        },
        ArrowDown: (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('y', 1);
        },
        ArrowLeft: (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('x', -1);
        },
        ArrowRight: (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('x', 1);
        },
        'Shift+ArrowUp': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('y', -10);
        },

        'Shift+ArrowDown': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('y', 10);
        },
        'Shift+ArrowLeft': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('x', -10);
        },
        'Shift+ArrowRight': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayer('x', 10);
        },
        '$mod+Shift+ArrowUp': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayerLevel(1);
        },
        '$mod+Shift+ArrowDown': (event) => {
          event.preventDefault();
          this.canvasInstance.moveLayerLevel(-1);
        },
      });
      this.handler = handler;
    }
    if (!this.multiHandlerOn) {
      this.multiHandlerOn = (e: KeyboardEvent) => {
        if (e.keyCode === 16) {
          console.log('shift on');
          // 打开multi
          // this.canvasInstance.toggleMultiSelected(true);
        }
      };
    }

    if (!this.multiHandlerOff) {
      this.multiHandlerOff = (e: KeyboardEvent) => {
        if (e.keyCode === 16) {
          console.log('shift off');
          // 打开multi
          // this.canvasInstance.toggleMultiSelected(false);
        }
      };
    }
  };

  listening = (target: any) => {
    target.addEventListener('keydown', this.handler);
    window.addEventListener('keydown', this.multiHandlerOn);
    window.addEventListener('keyup', this.multiHandlerOff);
  };

  destory = (target: any) => {
    target.removeEventListener('keydown', this.handler);
    window.removeEventListener('keydown', this.multiHandlerOn);
    window.removeEventListener('keyup', this.multiHandlerOff);
    this.handler = undefined;
    this.multiHandlerOn = undefined;
    this.multiHandlerOff = undefined;
  };
}

export default KeyboardListener;
