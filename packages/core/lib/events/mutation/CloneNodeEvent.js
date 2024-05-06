"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloneNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class CloneNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'clone:node';
    }
}
exports.CloneNodeEvent = CloneNodeEvent;
