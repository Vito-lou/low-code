import { EventDriver } from '@lowcode/shared';
import { ViewportResizeEvent } from '../events';
import { ResizeObserver } from '@juggle/resize-observer';
import { globalThisPolyfill } from '@lowcode/shared';
export class ViewportResizeDriver extends EventDriver {
    constructor() {
        super(...arguments);
        this.request = null;
        this.resizeObserver = null;
        this.onResize = (e) => {
            if (e.preventDefault)
                e.preventDefault();
            this.request = requestAnimationFrame(() => {
                cancelAnimationFrame(this.request);
                this.dispatch(new ViewportResizeEvent({
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
        if (this.contentWindow && this.contentWindow !== globalThisPolyfill) {
            this.addEventListener('resize', this.onResize);
        }
        else {
            if (this.container && this.container !== document) {
                this.resizeObserver = new ResizeObserver(this.onResize);
                this.resizeObserver.observe(this.container);
            }
        }
    }
    detach() {
        if (this.contentWindow && this.contentWindow !== globalThisPolyfill) {
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
