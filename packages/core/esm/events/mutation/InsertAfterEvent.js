import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class InsertAfterEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'insert:after';
    }
}
