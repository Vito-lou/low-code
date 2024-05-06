import { AbstractCursorEvent } from './AbstractCursorEvent';
export class MouseMoveEvent extends AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'mouse:move';
    }
}
