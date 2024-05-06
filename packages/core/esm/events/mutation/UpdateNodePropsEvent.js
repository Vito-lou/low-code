import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class UpdateNodePropsEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'update:node:props';
    }
}
