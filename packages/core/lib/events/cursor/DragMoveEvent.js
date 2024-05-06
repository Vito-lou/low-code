"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragMoveEvent = void 0;
const AbstractCursorEvent_1 = require("./AbstractCursorEvent");
class DragMoveEvent extends AbstractCursorEvent_1.AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:move';
    }
}
exports.DragMoveEvent = DragMoveEvent;
