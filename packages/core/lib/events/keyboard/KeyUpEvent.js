"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyUpEvent = void 0;
const AbstractKeyboardEvent_1 = require("./AbstractKeyboardEvent");
class KeyUpEvent extends AbstractKeyboardEvent_1.AbstractKeyboardEvent {
    constructor() {
        super(...arguments);
        this.type = 'key:up';
    }
}
exports.KeyUpEvent = KeyUpEvent;
