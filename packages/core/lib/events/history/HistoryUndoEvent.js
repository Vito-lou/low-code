"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRedoEvent = void 0;
const AbstractHistoryEvent_1 = require("./AbstractHistoryEvent");
class HistoryRedoEvent extends AbstractHistoryEvent_1.AbstractHistoryEvent {
    constructor() {
        super(...arguments);
        this.type = 'history:redo';
    }
}
exports.HistoryRedoEvent = HistoryRedoEvent;
