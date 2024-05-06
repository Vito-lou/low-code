"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseMoveEvent = void 0;
const AbstractCursorEvent_1 = require("./AbstractCursorEvent");
class MouseMoveEvent extends AbstractCursorEvent_1.AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'mouse:move';
    }
}
exports.MouseMoveEvent = MouseMoveEvent;
