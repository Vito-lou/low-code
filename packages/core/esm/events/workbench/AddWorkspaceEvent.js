import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';
export class AddWorkspaceEvent extends AbstractWorkspaceEvent {
    constructor() {
        super(...arguments);
        this.type = 'add:workspace';
    }
}
