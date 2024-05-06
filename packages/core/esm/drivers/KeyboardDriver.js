import { EventDriver } from '@lowcode/shared';
import { KeyDownEvent, KeyUpEvent } from '../events';
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
export class KeyboardDriver extends EventDriver {
    constructor() {
        super(...arguments);
        this.onKeyDown = (e) => {
            if (!filter(e))
                return;
            this.dispatch(new KeyDownEvent(e));
        };
        this.onKeyUp = (e) => {
            this.dispatch(new KeyUpEvent(e));
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
