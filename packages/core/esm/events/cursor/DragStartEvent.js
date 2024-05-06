import { AbstractCursorEvent } from './AbstractCursorEvent';
export class DragStartEvent extends AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:start';
    }
}
