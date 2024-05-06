import { AbstractHistoryEvent } from './AbstractHistoryEvent';
export class HistoryPushEvent extends AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:push';
    }
}
