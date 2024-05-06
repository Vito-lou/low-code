import { AbstractHistoryEvent } from './AbstractHistoryEvent';
export class HistoryUndoEvent extends AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:undo';
    }
}
