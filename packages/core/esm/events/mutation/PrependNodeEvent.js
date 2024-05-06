import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class PrependNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'prepend:node';
    }
}
