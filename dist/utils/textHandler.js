var SelectChangeListener = (function () {
    function SelectChangeListener(target, originalText, handleAnchor, allWidth) {
        var _this = this;
        this.handler = function (e) {
            var content = e.target.value;
            console.log('content', content);
            var selection = document.all
                ?
                    document.selection.createRange().text
                : document.getSelection();
            var text = selection.toString();
            var startIndex = _this.originalText.indexOf(text);
            console.log('text', text);
            if (startIndex > -1 && content) {
                _this.handleAnchor(_this.allWidth, startIndex, startIndex + text.length, content.length);
            }
        };
        this.listen = function () {
            document.addEventListener('mouseup', _this.handler);
        };
        this.destory = function () {
            document.removeEventListener('mouseup', _this.handler);
        };
        this.target = target;
        this.originalText = originalText;
        this.handleAnchor = handleAnchor;
        this.allWidth = allWidth;
    }
    return SelectChangeListener;
}());
var getRealBoxSize = function (trRef, stageScale, textNode) {
    var _a;
    var transformerBoxAttr = (_a = trRef.current.children) === null || _a === void 0 ? void 0 : _a[0].attrs;
    var size = {};
    size.width =
        transformerBoxAttr.width * stageScale - textNode.padding() * 2 + 'px';
    size.height =
        transformerBoxAttr.height * stageScale - textNode.padding() * 2 + 'px';
    return size;
};
export { SelectChangeListener, getRealBoxSize };
