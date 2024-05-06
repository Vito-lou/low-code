"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDownEvent = void 0;
const AbstractKeyboardEvent_1 = require("./AbstractKeyboardEvent");
class KeyDownEvent extends AbstractKeyboardEvent_1.AbstractKeyboardEvent {
    constructor() {
        super(...arguments);
        this.type = 'key:down';
    }
}
exports.KeyDownEvent = KeyDownEvent;
