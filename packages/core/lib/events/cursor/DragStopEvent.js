"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragStopEvent = void 0;
const AbstractCursorEvent_1 = require("./AbstractCursorEvent");
class DragStopEvent extends AbstractCursorEvent_1.AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:stop';
    }
}
exports.DragStopEvent = DragStopEvent;
