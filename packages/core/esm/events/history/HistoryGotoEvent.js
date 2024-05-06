import { AbstractHistoryEvent } from './AbstractHistoryEvent';
export class HistoryGotoEvent extends AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:goto';
    }
}
