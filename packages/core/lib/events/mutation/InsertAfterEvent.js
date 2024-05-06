"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertAfterEvent = void 0;
const AbstractMutationNodeEvent_1 = require("./AbstractMutationNodeEvent");
class InsertAfterEvent extends AbstractMutationNodeEvent_1.AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'insert:after';
    }
}
exports.InsertAfterEvent = InsertAfterEvent;
