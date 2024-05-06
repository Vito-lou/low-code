"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchWorkspaceEvent = void 0;
const AbstractWorkspaceEvent_1 = require("./AbstractWorkspaceEvent");
class SwitchWorkspaceEvent extends AbstractWorkspaceEvent_1.AbstractWorkspaceEvent {
    constructor() {
        super(...arguments);
        this.type = 'switch:workspace';
    }
}
exports.SwitchWorkspaceEvent = SwitchWorkspaceEvent;
