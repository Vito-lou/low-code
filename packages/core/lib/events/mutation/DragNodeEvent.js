"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class DragNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:node';
    }
}
exports.DragNodeEvent = DragNodeEvent;
