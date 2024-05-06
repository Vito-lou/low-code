"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class DropNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'drop:node';
    }
}
exports.DropNodeEvent = DropNodeEvent;
