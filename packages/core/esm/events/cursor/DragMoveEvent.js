import { AbstractCursorEvent } from './AbstractCursorEvent';
export class DragMoveEvent extends AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'drag:move';
    }
}
