"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelIdle = exports.requestIdle = void 0;
require("requestidlecallback");
const globalThisPolyfill_1 = require("./globalThisPolyfill");
const requestIdle = (callback, options) => {
    return globalThisPolyfill_1.globalThisPolyfill['requestIdleCallback'](callback, options);
};
exports.requestIdle = requestIdle;
const cancelIdle = (id) => {
    globalThisPolyfill_1.globalThisPolyfill['cancelIdleCallback'](id);
};
exports.cancelIdle = cancelIdle;
