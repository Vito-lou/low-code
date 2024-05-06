"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertChildrenEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class InsertChildrenEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'insert:children';
    }
}
exports.InsertChildrenEvent = InsertChildrenEvent;
