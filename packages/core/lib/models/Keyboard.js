"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keyboard = void 0;
const reactive_1 = require("@formily/reactive");
const shared_1 = require("@lowcode/shared");
const Shortcut_1 = require("./Shortcut");
const Modifiers = [
    ['metaKey', shared_1.KeyCode.Meta],
    ['shiftKey', shared_1.KeyCode.Shift],
    ['ctrlKey', shared_1.KeyCode.Control],
    ['altKey', shared_1.KeyCode.Alt],
];
class Keyboard {
    constructor(engine) {
        var _a;
        this.shortcuts = [];
        this.sequence = [];
        this.keyDown = null;
        this.modifiers = {};
        this.requestTimer = null;
        this.engine = engine;
        this.shortcuts = ((_a = engine.props) === null || _a === void 0 ? void 0 : _a.shortcuts) || [];
        this.makeObservable();
    }
    matchCodes(context) {
        for (let i = 0; i < this.shortcuts.length; i++) {
            const shortcut = this.shortcuts[i];
            if (shortcut.match(this.sequence, context)) {
                return true;
            }
        }
        return false;
    }
    preventCodes() {
        return this.shortcuts.some((shortcut) => {
            return shortcut.preventCodes(this.sequence);
        });
    }
    includes(key) {
        return this.sequence.some((code) => Shortcut_1.Shortcut.matchCode(code, key));
    }
    excludes(key) {
        this.sequence = this.sequence.filter((code) => !Shortcut_1.Shortcut.matchCode(key, code));
    }
    addKeyCode(key) {
        if (!this.includes(key)) {
            this.sequence.push(key);
        }
    }
    removeKeyCode(key) {
        if (this.includes(key)) {
            this.excludes(key);
        }
    }
    isModifier(code) {
        return Modifiers.some((modifier) => Shortcut_1.Shortcut.matchCode(modifier[1], code));
    }
    handleModifiers(event) {
        Modifiers.forEach(([key, code]) => {
            if (event[key]) {
                if (!this.includes(code)) {
                    this.sequence = [code].concat(this.sequence);
                }
            }
        });
    }
    handleKeyboard(event, context) {
        if (event.eventType === 'keydown') {
            this.keyDown = event.data;
            this.addKeyCode(this.keyDown);
            this.handleModifiers(event);
            if (this.matchCodes(context)) {
                this.sequence = [];
            }
            this.requestClean(4000);
            if (this.preventCodes()) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
        else {
            if (this.isModifier(event.data)) {
                this.sequence = [];
            }
            this.keyDown = null;
        }
    }
    isKeyDown(code) {
        return this.keyDown === code;
    }
    requestClean(duration = 320) {
        clearTimeout(this.requestTimer);
        this.requestTimer = setTimeout(() => {
            this.keyDown = null;
            this.sequence = [];
            clearTimeout(this.requestTimer);
        }, duration);
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            sequence: reactive_1.observable.shallow,
            keyDown: reactive_1.observable.ref,
            handleKeyboard: reactive_1.action,
        });
    }
}
exports.Keyboard = Keyboard;
