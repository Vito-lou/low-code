"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class HoverNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'hover:node';
    }
}
exports.HoverNodeEvent = HoverNodeEvent;
