import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';
export class RemoveWorkspaceEvent extends AbstractWorkspaceEvent {
    constructor() {
        super(...arguments);
        this.type = 'remove:workspace';
    }
}
