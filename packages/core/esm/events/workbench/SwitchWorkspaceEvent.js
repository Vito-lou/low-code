import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';
export class SwitchWorkspaceEvent extends AbstractWorkspaceEvent {
    constructor() {
        super(...arguments);
        this.type = 'switch:workspace';
    }
}
