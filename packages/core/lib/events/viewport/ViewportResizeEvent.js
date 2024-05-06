"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportResizeEvent = void 0;
const AbstractViewportEvent_1 = require("./AbstractViewportEvent");
class ViewportResizeEvent extends AbstractViewportEvent_1.AbstractViewportEvent {
    constructor() {
        super(...arguments);
        this.type = 'viewport:resize';
    }
}
exports.ViewportResizeEvent = ViewportResizeEvent;
