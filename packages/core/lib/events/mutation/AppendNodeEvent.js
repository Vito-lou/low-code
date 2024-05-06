"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class AppendNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'append:node';
    }
}
exports.AppendNodeEvent = AppendNodeEvent;
