import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class InsertChildrenEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'insert:children';
    }
}
