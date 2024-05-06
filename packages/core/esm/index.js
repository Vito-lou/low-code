var _a;
import * as Core from './exports';
export * from './exports';
import { globalThisPolyfill } from '@lowcode/shared';
if ((_a = globalThisPolyfill === null || globalThisPolyfill === void 0 ? void 0 : globalThisPolyfill['Designable']) === null || _a === void 0 ? void 0 : _a['Core']) {
    if (module.exports) {
        module.exports = Object.assign({ __esModule: true }, globalThisPolyfill['Designable']['Core']);
    }
}
else {
    globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {};
    globalThisPolyfill['Designable'].Core = Core;
}
