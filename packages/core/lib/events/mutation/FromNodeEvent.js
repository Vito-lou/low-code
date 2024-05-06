"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FromNodeEvent = void 0;
class FromNodeEvent {
    constructor(data) {
        this.type = 'from:node';
        this.data = data;
    }
}
exports.FromNodeEvent = FromNodeEvent;
