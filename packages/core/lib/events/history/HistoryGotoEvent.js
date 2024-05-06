"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryGotoEvent = void 0;
const AbstractHistoryEvent_1 = require("./AbstractHistoryEvent");
class HistoryGotoEvent extends AbstractHistoryEvent_1.AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:goto';
    }
}
exports.HistoryGotoEvent = HistoryGotoEvent;
