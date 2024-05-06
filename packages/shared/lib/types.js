"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidNumber = exports.isValid = exports.isRegExp = exports.isObj = exports.isNum = exports.isBool = exports.isStr = exports.isPlainObj = exports.isArr = exports.isHTMLElement = exports.isWindow = exports.isFn = exports.getType = void 0;
const isType = (type) => (obj) => obj != null &&
    (Array.isArray(type) ? type : [type]).some((t) => (0, exports.getType)(obj) === `[object ${t}]`);
const getType = (obj) => Object.prototype.toString.call(obj);
exports.getType = getType;
exports.isFn = isType([
    'Function',
    'AsyncFunction',
    'GeneratorFunction',
]);
exports.isWindow = isType('Window');
const isHTMLElement = (obj) => {
    return (obj === null || obj === void 0 ? void 0 : obj['nodeName']) || (obj === null || obj === void 0 ? void 0 : obj['tagName']);
};
exports.isHTMLElement = isHTMLElement;
exports.isArr = Array.isArray;
exports.isPlainObj = isType('Object');
exports.isStr = isType('String');
exports.isBool = isType('Boolean');
exports.isNum = isType('Number');
const isObj = (val) => typeof val === 'object';
exports.isObj = isObj;
exports.isRegExp = isType('RegExp');
const isValid = (val) => val !== null && val !== undefined;
exports.isValid = isValid;
const isValidNumber = (val) => !isNaN(val) && (0, exports.isNum)(val);
exports.isValidNumber = isValidNumber;
