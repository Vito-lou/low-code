"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class RemoveNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'remove:node';
    }
}
exports.RemoveNodeEvent = RemoveNodeEvent;
