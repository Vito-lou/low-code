"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveWorkspaceEvent = void 0;
const AbstractWorkspaceEvent_1 = require("./AbstractWorkspaceEvent");
class RemoveWorkspaceEvent extends AbstractWorkspaceEvent_1.AbstractWorkspaceEvent {
    constructor() {
        super(...arguments);
        this.type = 'remove:workspace';
    }
}
exports.RemoveWorkspaceEvent = RemoveWorkspaceEvent;
