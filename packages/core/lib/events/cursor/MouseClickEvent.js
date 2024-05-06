"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseDoubleClickEvent = exports.MouseClickEvent = void 0;
const AbstractCursorEvent_1 = require("./AbstractCursorEvent");
class MouseClickEvent extends AbstractCursorEvent_1.AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'mouse:click';
    }
}
exports.MouseClickEvent = MouseClickEvent;
class MouseDoubleClickEvent extends AbstractCursorEvent_1.AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'mouse:dblclick';
    }
}
exports.MouseDoubleClickEvent = MouseDoubleClickEvent;
