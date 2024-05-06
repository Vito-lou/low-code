"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractViewportEvent = void 0;
const shared_1 = require("@lowcode/shared");
class AbstractViewportEvent {
    constructor(data) {
        this.data = data || {
            scrollX: shared_1.globalThisPolyfill.scrollX,
            scrollY: shared_1.globalThisPolyfill.scrollY,
            width: shared_1.globalThisPolyfill.innerWidth,
            height: shared_1.globalThisPolyfill.innerHeight,
            innerWidth: shared_1.globalThisPolyfill.innerWidth,
            innerHeight: shared_1.globalThisPolyfill.innerHeight,
            view: shared_1.globalThisPolyfill,
            target: shared_1.globalThisPolyfill,
        };
    }
}
exports.AbstractViewportEvent = AbstractViewportEvent;
