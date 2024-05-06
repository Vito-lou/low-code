import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class SelectNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'select:node';
    }
}
