class SelectChangeListener {
  target: HTMLElement;
  originalText: string;
  handleAnchor: (
    allWidth: number,
    start: number,
    end: number,
    total: number
  ) => void;
  allWidth: number;
  constructor(
    target: HTMLElement,
    originalText: string,
    handleAnchor: (
      allWidth: number,
      start: number,
      end: number,
      total: number
    ) => void,
    allWidth: number
  ) {
    this.target = target;
    this.originalText = originalText;
    this.handleAnchor = handleAnchor;
    this.allWidth = allWidth;
  }

  public handler = (e: any) => {
    const content = e.target.value;
    console.log('content', content);
    const selection = document.all
      ? // @ts-ignore
        document.selection.createRange().text
      : document.getSelection();

    const text = selection.toString();
    const startIndex = this.originalText.indexOf(text);
    console.log('text', text);
    if (startIndex > -1 && content) {
      this.handleAnchor(
        this.allWidth,
        startIndex,
        startIndex + text.length,
        content.length
      );
    }
  };

  listen = () => {
    document.addEventListener('mouseup', this.handler);
  };

  destory = () => {
    document.removeEventListener('mouseup', this.handler);
  };
}

const getRealBoxSize = (trRef: any, stageScale: number, textNode: any) => {
  const transformerBoxAttr = trRef.current.children?.[0].attrs;

  const size: any = {};

  size.width =
    transformerBoxAttr.width * stageScale - textNode.padding() * 2 + 'px';
  size.height =
    transformerBoxAttr.height * stageScale - textNode.padding() * 2 + 'px';

  return size;
};

export { SelectChangeListener, getRealBoxSize };
