"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
const reactive_1 = require("@formily/reactive");
class History {
    constructor(context, props) {
        this.current = 0;
        this.history = [];
        this.updateTimer = null;
        this.maxSize = 100;
        this.locking = false;
        this.context = context;
        this.props = props;
        this.push();
        this.makeObservable();
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            current: reactive_1.observable.ref,
            history: reactive_1.observable.shallow,
            push: reactive_1.action,
            undo: reactive_1.action,
            redo: reactive_1.action,
            goTo: reactive_1.action,
            clear: reactive_1.action,
        });
    }
    list() {
        return this.history;
    }
    push(type) {
        var _a;
        if (this.locking)
            return;
        if (this.current < this.history.length - 1) {
            this.history = this.history.slice(0, this.current + 1);
        }
        const item = {
            data: this.context.serialize(),
            timestamp: Date.now(),
            type,
        };
        this.current = this.history.length;
        this.history.push(item);
        const overSizeCount = this.history.length - this.maxSize;
        if (overSizeCount > 0) {
            this.history.splice(0, overSizeCount);
            this.current = this.history.length - 1;
        }
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.onPush) {
            this.props.onPush(item);
        }
    }
    get allowUndo() {
        return this.history.length > 0 && this.current - 1 >= 0;
    }
    get allowRedo() {
        return this.history.length > this.current + 1;
    }
    redo() {
        var _a;
        if (this.allowRedo) {
            const item = this.history[this.current + 1];
            this.locking = true;
            this.context.from(item.data);
            this.locking = false;
            this.current++;
            if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.onRedo) {
                this.props.onRedo(item);
            }
        }
    }
    undo() {
        var _a;
        if (this.allowUndo) {
            const item = this.history[this.current - 1];
            this.locking = true;
            this.context.from(item.data);
            this.locking = false;
            this.current--;
            if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.onUndo) {
                this.props.onUndo(item);
            }
        }
    }
    goTo(index) {
        var _a;
        const item = this.history[index];
        if (item) {
            this.locking = true;
            this.context.from(item.data);
            this.locking = false;
            this.current = index;
            if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.onGoto) {
                this.props.onGoto(item);
            }
        }
    }
    clear() {
        this.history = [];
        this.current = 0;
    }
}
exports.History = History;
