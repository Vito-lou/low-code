"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryUndoEvent = void 0;
const AbstractHistoryEvent_1 = require("./AbstractHistoryEvent");
class HistoryUndoEvent extends AbstractHistoryEvent_1.AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:undo';
    }
}
exports.HistoryUndoEvent = HistoryUndoEvent;
