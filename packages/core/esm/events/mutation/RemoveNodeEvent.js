import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class RemoveNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'remove:node';
    }
}
