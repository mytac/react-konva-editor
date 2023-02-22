"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealBoxSize = exports.SelectChangeListener = void 0;
class SelectChangeListener {
    constructor(target, originalText, handleAnchor, allWidth) {
        this.handler = (e) => {
            const content = e.target.value;
            console.log('content', content);
            const selection = document.all
                ?
                    document.selection.createRange().text
                : document.getSelection();
            const text = selection.toString();
            const startIndex = this.originalText.indexOf(text);
            console.log('text', text);
            if (startIndex > -1 && content) {
                this.handleAnchor(this.allWidth, startIndex, startIndex + text.length, content.length);
            }
        };
        this.listen = () => {
            document.addEventListener('mouseup', this.handler);
        };
        this.destory = () => {
            document.removeEventListener('mouseup', this.handler);
        };
        this.target = target;
        this.originalText = originalText;
        this.handleAnchor = handleAnchor;
        this.allWidth = allWidth;
    }
}
exports.SelectChangeListener = SelectChangeListener;
const getRealBoxSize = (trRef, stageScale, textNode) => {
    const transformerBoxAttr = trRef.current.children?.[0].attrs;
    const size = {};
    size.width =
        transformerBoxAttr.width * stageScale - textNode.padding() * 2 + 'px';
    size.height =
        transformerBoxAttr.height * stageScale - textNode.padding() * 2 + 'px';
    return size;
};
exports.getRealBoxSize = getRealBoxSize;
