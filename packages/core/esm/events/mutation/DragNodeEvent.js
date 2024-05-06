import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class DragNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:node';
    }
}
