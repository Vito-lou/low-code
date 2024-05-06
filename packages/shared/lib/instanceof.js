"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instOf = void 0;
const types_1 = require("./types");
const globalThisPolyfill_1 = require("./globalThisPolyfill");
const instOf = (value, cls) => {
    if ((0, types_1.isFn)(cls))
        return value instanceof cls;
    if ((0, types_1.isStr)(cls))
        return globalThisPolyfill_1.globalThisPolyfill[cls]
            ? value instanceof globalThisPolyfill_1.globalThisPolyfill[cls]
            : false;
    return false;
};
exports.instOf = instOf;
