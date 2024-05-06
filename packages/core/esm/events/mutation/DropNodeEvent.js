import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class DropNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'drop:node';
    }
}
