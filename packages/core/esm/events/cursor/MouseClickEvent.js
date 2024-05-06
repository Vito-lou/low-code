import { AbstractCursorEvent } from './AbstractCursorEvent';
export class MouseClickEvent extends AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'mouse:click';
    }
}
export class MouseDoubleClickEvent extends AbstractCursorEvent {
    constructor() {
        super(...arguments);
        this.type = 'mouse:dblclick';
    }
}
