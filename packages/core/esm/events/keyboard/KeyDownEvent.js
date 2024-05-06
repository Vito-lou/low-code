import { AbstractKeyboardEvent } from './AbstractKeyboardEvent';
export class KeyDownEvent extends AbstractKeyboardEvent {
    constructor() {
        super(...arguments);
        this.type = 'key:down';
    }
}
