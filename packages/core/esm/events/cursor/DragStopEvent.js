import { AbstractCursorEvent } from './AbstractCursorEvent';
export class DragStopEvent extends AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:stop';
    }
}
