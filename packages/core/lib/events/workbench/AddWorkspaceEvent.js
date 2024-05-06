"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkspaceEvent = void 0;
const AbstractWorkspaceEvent_1 = require("./AbstractWorkspaceEvent");
class AddWorkspaceEvent extends AbstractWorkspaceEvent_1.AbstractWorkspaceEvent {
    constructor() {
        super(...arguments);
        this.type = 'add:workspace';
    }
}
exports.AddWorkspaceEvent = AddWorkspaceEvent;
