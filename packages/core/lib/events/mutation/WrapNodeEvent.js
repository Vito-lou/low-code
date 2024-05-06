"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrapNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class WrapNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'wrap:node';
    }
}
exports.WrapNodeEvent = WrapNodeEvent;
