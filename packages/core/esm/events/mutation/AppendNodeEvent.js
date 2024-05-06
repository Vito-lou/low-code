import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class AppendNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'append:node';
    }
}
