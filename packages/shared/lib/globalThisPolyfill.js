"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalThisPolyfill = void 0;
function getGlobalThis() {
    try {
        if (typeof self !== 'undefined') {
            return self;
        }
    }
    catch (e) { }
    try {
        if (typeof exports.globalThisPolyfill !== 'undefined') {
            return exports.globalThisPolyfill;
        }
    }
    catch (e) { }
    try {
        if (typeof global !== 'undefined') {
            return global;
        }
    }
    catch (e) { }
    return Function('return this')();
}
exports.globalThisPolyfill = getGlobalThis();
