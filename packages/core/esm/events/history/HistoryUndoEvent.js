import { AbstractHistoryEvent } from './AbstractHistoryEvent';
export class HistoryRedoEvent extends AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:redo';
    }
}
