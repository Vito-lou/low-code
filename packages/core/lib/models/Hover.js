"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hover = void 0;
const reactive_1 = require("@formily/reactive");
const events_1 = require("../events");
class Hover {
    constructor(props) {
        this.node = null;
        this.operation = props === null || props === void 0 ? void 0 : props.operation;
        this.makeObservable();
    }
    setHover(node) {
        if (node) {
            this.node = node;
        }
        else {
            this.node = null;
        }
        this.trigger();
    }
    clear() {
        this.node = null;
    }
    trigger() {
        if (this.operation) {
            return this.operation.dispatch(new events_1.HoverNodeEvent({
                target: this.operation.tree,
                source: this.node,
            }));
        }
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            node: reactive_1.observable.ref,
            setHover: reactive_1.action,
            clear: reactive_1.action,
        });
    }
}
exports.Hover = Hover;
