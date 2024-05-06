import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class HoverNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'hover:node';
    }
}
