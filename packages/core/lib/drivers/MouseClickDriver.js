"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseClickDriver = void 0;
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
class MouseClickDriver extends shared_1.EventDriver {
    constructor() {
        super(...arguments);
        this.onMouseClick = (e) => {
            const target = e.target;
            if (target === null || target === void 0 ? void 0 : target.closest(`*[${this.engine.props.clickStopPropagationAttrName}]`)) {
                return;
            }
            this.dispatch(new events_1.MouseClickEvent({
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                target: e.target,
                view: e.view,
            }));
        };
        this.onMouseDoubleClick = (e) => {
            const target = e.target;
            if (target === null || target === void 0 ? void 0 : target.closest(`*[${this.engine.props.clickStopPropagationAttrName}]`)) {
                return;
            }
            this.dispatch(new events_1.MouseDoubleClickEvent({
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                target: e.target,
                view: e.view,
            }));
        };
    }
    attach() {
        this.addEventListener('click', this.onMouseClick, {
            mode: 'onlyChild',
        });
        this.addEventListener('dblclick', this.onMouseDoubleClick, {
            mode: 'onlyChild',
        });
    }
    detach() {
        this.removeEventListener('click', this.onMouseClick, {
            mode: 'onlyChild',
        });
        this.removeEventListener('dblclick', this.onMouseDoubleClick, {
            mode: 'onlyChild',
        });
    }
}
exports.MouseClickDriver = MouseClickDriver;
