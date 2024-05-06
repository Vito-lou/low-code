import { globalThisPolyfill } from '@lowcode/shared';
export class AbstractViewportEvent {
    constructor(data) {
        this.data = data || {
            scrollX: globalThisPolyfill.scrollX,
            scrollY: globalThisPolyfill.scrollY,
            width: globalThisPolyfill.innerWidth,
            height: globalThisPolyfill.innerHeight,
            innerWidth: globalThisPolyfill.innerWidth,
            innerHeight: globalThisPolyfill.innerHeight,
            view: globalThisPolyfill,
            target: globalThisPolyfill,
        };
    }
}
