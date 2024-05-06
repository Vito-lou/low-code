import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class WrapNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'wrap:node';
    }
}
