"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserLanguage = exports.mergeLocales = exports.lowerSnake = void 0;
const shared_1 = require("@lowcode/shared");
const shared_2 = require("@lowcode/shared");
const lowerSnake = (str) => {
    return String(str).replace(/\s+/g, '_').toLocaleLowerCase();
};
exports.lowerSnake = lowerSnake;
const mergeLocales = (target, source) => {
    if ((0, shared_1.isPlainObj)(target) && (0, shared_1.isPlainObj)(source)) {
        (0, shared_1.each)(source, function (value, key) {
            const token = (0, exports.lowerSnake)(key);
            const messages = (0, exports.mergeLocales)(target[key] || target[token], value);
            target[token] = messages;
        });
        return target;
    }
    else if ((0, shared_1.isPlainObj)(source)) {
        const result = Array.isArray(source) ? [] : {};
        (0, shared_1.each)(source, function (value, key) {
            const messages = (0, exports.mergeLocales)(undefined, value);
            result[(0, exports.lowerSnake)(key)] = messages;
        });
        return result;
    }
    return source;
};
exports.mergeLocales = mergeLocales;
const getBrowserLanguage = () => {
    var _a;
    /* istanbul ignore next */
    if (!shared_2.globalThisPolyfill.navigator) {
        return 'en';
    }
    return (shared_2.globalThisPolyfill.navigator['browserlanguage'] ||
        ((_a = shared_2.globalThisPolyfill.navigator) === null || _a === void 0 ? void 0 : _a.language) ||
        'en');
};
exports.getBrowserLanguage = getBrowserLanguage;
