import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class CloneNodeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'clone:node';
    }
}
