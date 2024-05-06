import { AbstractKeyboardEvent } from './AbstractKeyboardEvent';
export class KeyUpEvent extends AbstractKeyboardEvent {
    constructor() {
        super(...arguments);
        this.type = 'key:up';
    }
}
