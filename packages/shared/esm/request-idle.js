import 'requestidlecallback';
import { globalThisPolyfill } from './globalThisPolyfill';
export const requestIdle = (callback, options) => {
    return globalThisPolyfill['requestIdleCallback'](callback, options);
};
export const cancelIdle = (id) => {
    globalThisPolyfill['cancelIdleCallback'](id);
};
