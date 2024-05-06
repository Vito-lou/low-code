"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryPushEvent = void 0;
const AbstractHistoryEvent_1 = require("./AbstractHistoryEvent");
class HistoryPushEvent extends AbstractHistoryEvent_1.AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:push';
    }
}
exports.HistoryPushEvent = HistoryPushEvent;
