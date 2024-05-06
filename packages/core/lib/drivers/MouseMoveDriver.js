"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseMoveDriver = void 0;
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
class MouseMoveDriver extends shared_1.EventDriver {
    constructor() {
        super(...arguments);
        this.request = null;
        this.onMouseMove = (e) => {
            this.request = requestAnimationFrame(() => {
                cancelAnimationFrame(this.request);
                this.dispatch(new events_1.MouseMoveEvent({
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    target: e.target,
                    view: e.view,
                }));
            });
        };
    }
    attach() {
        this.addEventListener('mousemove', this.onMouseMove, {
            mode: 'onlyOne',
        });
    }
    detach() {
        this.removeEventListener('mouseover', this.onMouseMove, {
            mode: 'onlyOne',
        });
    }
}
exports.MouseMoveDriver = MouseMoveDriver;
