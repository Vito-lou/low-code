"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNodePropsEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class UpdateNodePropsEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'update:node:props';
    }
}
exports.UpdateNodePropsEvent = UpdateNodePropsEvent;
