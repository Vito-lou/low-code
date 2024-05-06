"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChildrenEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class UpdateChildrenEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'update:children';
    }
}
exports.UpdateChildrenEvent = UpdateChildrenEvent;
