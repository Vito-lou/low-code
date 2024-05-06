import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class InsertBeforeEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'insert:before';
    }
}
