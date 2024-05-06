import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class UnSelectNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'unselect:node';
    }
}
