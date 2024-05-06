import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export class UpdateChildrenEvent extends AbstractMutationNodeEvent {
    constructor() {
        super(...arguments);
        this.type = 'update:children';
    }
}
