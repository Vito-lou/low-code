"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnSelectNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class UnSelectNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'unselect:node';
    }
}
exports.UnSelectNodeEvent = UnSelectNodeEvent;
