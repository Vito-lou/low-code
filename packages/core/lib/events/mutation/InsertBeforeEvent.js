"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertBeforeEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class InsertBeforeEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'insert:before';
    }
}
exports.InsertBeforeEvent = InsertBeforeEvent;
