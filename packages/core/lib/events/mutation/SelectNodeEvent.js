"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectNodeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class SelectNodeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'select:node';
    }
}
exports.SelectNodeEvent = SelectNodeEvent;
