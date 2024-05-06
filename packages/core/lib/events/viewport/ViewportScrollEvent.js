"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportScrollEvent = void 0;
const AbstractViewportEvent_1 = require("./AbstractViewportEvent");
class ViewportScrollEvent extends AbstractViewportEvent_1.AbstractViewportEvent {
    constructor() {
        super(...arguments);
        this.type = 'viewport:scroll';
    }
}
exports.ViewportScrollEvent = ViewportScrollEvent;
