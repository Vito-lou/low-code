"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportScrollDriver = void 0;
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
class ViewportScrollDriver extends shared_1.EventDriver {
    constructor() {
        super(...arguments);
        this.request = null;
        this.onScroll = (e) => {
            e.preventDefault();
            this.request = shared_1.globalThisPolyfill.requestAnimationFrame(() => {
                this.dispatch(new events_1.ViewportScrollEvent({
                    scrollX: this.contentWindow.scrollX,
                    scrollY: this.contentWindow.scrollY,
                    width: this.contentWindow.document.body.clientWidth,
                    height: this.contentWindow.document.body.clientHeight,
                    innerHeight: this.contentWindow.innerHeight,
                    innerWidth: this.contentWindow.innerWidth,
                    view: this.contentWindow,
                    target: e.target,
                }));
                cancelAnimationFrame(this.request);
            });
        };
    }
    attach() {
        this.addEventListener('scroll', this.onScroll);
    }
    detach() {
        this.removeEventListener('scroll', this.onScroll);
    }
}
exports.ViewportScrollDriver = ViewportScrollDriver;
