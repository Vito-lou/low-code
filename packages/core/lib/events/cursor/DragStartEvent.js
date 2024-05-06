"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragStartEvent = void 0;
const AbstractCursorEvent_1 = require("./AbstractCursorEvent");
class DragStartEvent extends AbstractCursorEvent_1.AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:start';
    }
}
exports.DragStartEvent = DragStartEvent;
