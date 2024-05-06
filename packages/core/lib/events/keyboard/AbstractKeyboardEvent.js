"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractKeyboardEvent = void 0;
const shared_1 = require("@lowcode/shared");
class AbstractKeyboardEvent {
    constructor(e) {
        this.data = (0, shared_1.getKeyCodeFromEvent)(e);
        this.originEvent = e;
    }
    get eventType() {
        return this.originEvent.type;
    }
    get ctrlKey() {
        return this.originEvent.ctrlKey;
    }
    get shiftKey() {
        return this.originEvent.shiftKey;
    }
    get metaKey() {
        return this.originEvent.metaKey;
    }
    get altkey() {
        return this.originEvent.altKey;
    }
    preventDefault() {
        if (this.originEvent.preventDefault) {
            this.originEvent.preventDefault();
        }
        else {
            this.originEvent.returnValue = false;
        }
    }
    stopPropagation() {
        var _a;
        if ((_a = this.originEvent) === null || _a === void 0 ? void 0 : _a.stopPropagation) {
            this.originEvent.stopPropagation();
        }
        else {
            this.originEvent.cancelBubble = true;
        }
    }
}
exports.AbstractKeyboardEvent = AbstractKeyboardEvent;
