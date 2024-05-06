"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportResizeDriver = void 0;
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
const resize_observer_1 = require("@juggle/resize-observer");
const shared_2 = require("@lowcode/shared");
class ViewportResizeDriver extends shared_1.EventDriver {
    constructor() {
        super(...arguments);
        this.request = null;
        this.resizeObserver = null;
        this.onResize = (e) => {
            if (e.preventDefault)
                e.preventDefault();
            this.request = requestAnimationFrame(() => {
                cancelAnimationFrame(this.request);
                this.dispatch(new events_1.ViewportResizeEvent({
                    scrollX: this.contentWindow.scrollX,
                    scrollY: this.contentWindow.scrollY,
                    width: this.contentWindow.innerWidth,
                    height: this.contentWindow.innerHeight,
                    innerHeight: this.contentWindow.innerHeight,
                    innerWidth: this.contentWindow.innerWidth,
                    view: this.contentWindow,
                    target: e.target || this.container,
                }));
            });
        };
    }
    attach() {
        if (this.contentWindow && this.contentWindow !== shared_2.globalThisPolyfill) {
            this.addEventListener('resize', this.onResize);
        }
        else {
            if (this.container && this.container !== document) {
                this.resizeObserver = new resize_observer_1.ResizeObserver(this.onResize);
                this.resizeObserver.observe(this.container);
            }
        }
    }
    detach() {
        if (this.contentWindow && this.contentWindow !== shared_2.globalThisPolyfill) {
            this.removeEventListener('resize', this.onResize);
        }
        else if (this.resizeObserver) {
            if (this.container && this.container !== document) {
                this.resizeObserver.unobserve(this.container);
                this.resizeObserver.disconnect();
            }
        }
    }
}
exports.ViewportResizeDriver = ViewportResizeDriver;
