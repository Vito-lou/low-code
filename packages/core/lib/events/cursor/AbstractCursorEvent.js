"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractCursorEvent = void 0;
const shared_1 = require("@lowcode/shared");
class AbstractCursorEvent {
    constructor(data) {
        this.data = data || {
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            target: null,
            view: shared_1.globalThisPolyfill,
        };
        this.transformCoordinates();
    }
    transformCoordinates() {
        var _a;
        const { frameElement } = ((_a = this.data) === null || _a === void 0 ? void 0 : _a.view) || {};
        if (frameElement && this.data.view !== shared_1.globalThisPolyfill) {
            const frameRect = frameElement.getBoundingClientRect();
            const scale = frameRect.width / frameElement['offsetWidth'];
            this.data.topClientX = this.data.clientX * scale + frameRect.x;
            this.data.topClientY = this.data.clientY * scale + frameRect.y;
            this.data.topPageX =
                this.data.pageX + frameRect.x - this.data.view.scrollX;
            this.data.topPageY =
                this.data.pageY + frameRect.y - this.data.view.scrollY;
            const topElement = document.elementFromPoint(this.data.topPageX, this.data.topClientY);
            if (topElement !== frameElement) {
                this.data.target = topElement;
            }
        }
        else {
            this.data.topClientX = this.data.clientX;
            this.data.topClientY = this.data.clientY;
            this.data.topPageX = this.data.pageX;
            this.data.topPageY = this.data.pageY;
        }
    }
}
exports.AbstractCursorEvent = AbstractCursorEvent;
