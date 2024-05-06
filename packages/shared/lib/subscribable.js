"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribable = void 0;
const types_1 = require("./types");
const UNSUBSCRIBE_ID_SYMBOL = Symbol('UNSUBSCRIBE_ID_SYMBOL');
class Subscribable {
    constructor() {
        this.subscribers = {
            index: 0,
        };
        this.unsubscribe = (id) => {
            if (id === undefined || id === null) {
                for (const key in this.subscribers) {
                    this.unsubscribe(key);
                }
                return;
            }
            if (!(0, types_1.isFn)(id)) {
                delete this.subscribers[id];
            }
            else {
                delete this.subscribers[id[UNSUBSCRIBE_ID_SYMBOL]];
            }
        };
    }
    dispatch(event, context) {
        let interrupted = false;
        for (const key in this.subscribers) {
            if ((0, types_1.isFn)(this.subscribers[key])) {
                event['context'] = context;
                if (this.subscribers[key](event) === false) {
                    interrupted = true;
                }
            }
        }
        return interrupted ? false : true;
    }
    subscribe(subscriber) {
        let id;
        if ((0, types_1.isFn)(subscriber)) {
            id = this.subscribers.index + 1;
            this.subscribers[id] = subscriber;
            this.subscribers.index++;
        }
        const unsubscribe = () => {
            this.unsubscribe(id);
        };
        unsubscribe[UNSUBSCRIBE_ID_SYMBOL] = id;
        return unsubscribe;
    }
}
exports.Subscribable = Subscribable;
