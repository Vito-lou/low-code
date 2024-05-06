"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardDriver = void 0;
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
function filter(event) {
    const target = event.target;
    const { tagName } = target;
    let flag = true;
    // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>、Web Components
    if (target['isContentEditable'] ||
        ((tagName === 'INPUT' ||
            tagName === 'TEXTAREA' ||
            tagName === 'SELECT' ||
            customElements.get(tagName.toLocaleLowerCase())) &&
            !target.readOnly)) {
        flag = false;
    }
    return flag;
}
class KeyboardDriver extends shared_1.EventDriver {
    constructor() {
        super(...arguments);
        this.onKeyDown = (e) => {
            if (!filter(e))
                return;
            this.dispatch(new events_1.KeyDownEvent(e));
        };
        this.onKeyUp = (e) => {
            this.dispatch(new events_1.KeyUpEvent(e));
        };
    }
    attach() {
        this.addEventListener('keydown', this.onKeyDown, {
            mode: 'onlyParent',
        });
        this.addEventListener('keyup', this.onKeyUp, {
            mode: 'onlyParent',
        });
    }
    detach() {
        this.removeEventListener('keydown', this.onKeyDown, {
            mode: 'onlyParent',
        });
        this.removeEventListener('keyup', this.onKeyUp, {
            mode: 'onlyParent',
        });
    }
}
exports.KeyboardDriver = KeyboardDriver;
