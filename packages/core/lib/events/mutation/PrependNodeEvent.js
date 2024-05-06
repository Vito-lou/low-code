"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrependNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class PrependNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'prepend:node';
    }
}
exports.PrependNodeEvent = PrependNodeEvent;
