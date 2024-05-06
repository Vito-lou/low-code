"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.shallowClone = void 0;
const types_1 = require("./types");
const instanceof_1 = require("./instanceof");
const NATIVE_KEYS = [
    ['Map', (map) => new Map(map)],
    ['WeakMap', (map) => new WeakMap(map)],
    ['WeakSet', (set) => new WeakSet(set)],
    ['Set', (set) => new Set(set)],
    ['Date', (date) => new Date(date)],
    'FileList',
    'File',
    'URL',
    'RegExp',
    [
        'Promise',
        (promise) => new Promise((resolve, reject) => promise.then(resolve, reject)),
    ],
];
const isNativeObject = (values) => {
    for (let i = 0; i < NATIVE_KEYS.length; i++) {
        const item = NATIVE_KEYS[i];
        if (Array.isArray(item) && item[0]) {
            if ((0, instanceof_1.instOf)(values, item[0])) {
                return item[1] ? item[1] : item[0];
            }
        }
        else {
            if ((0, instanceof_1.instOf)(values, item)) {
                return item;
            }
        }
    }
};
const shallowClone = (values) => {
    let nativeClone;
    if (Array.isArray(values)) {
        return values.slice(0);
    }
    else if (isNativeObject(values)) {
        nativeClone = isNativeObject(values);
        return (0, types_1.isFn)(nativeClone) ? nativeClone(values) : values;
    }
    else if (typeof values === 'object' && !!values) {
        return Object.assign({}, values);
    }
};
exports.shallowClone = shallowClone;
const clone = (values, filter) => {
    let nativeClone;
    if (Array.isArray(values)) {
        return values.map((item) => (0, exports.clone)(item, filter));
    }
    else if (isNativeObject(values)) {
        nativeClone = isNativeObject(values);
        return (0, types_1.isFn)(nativeClone) ? nativeClone(values) : values;
    }
    else if (typeof values === 'object' && !!values) {
        if ('$$typeof' in values && '_owner' in values) {
            return values;
        }
        if (values._isAMomentObject) {
            return values;
        }
        if (values._isJSONSchemaObject) {
            return values;
        }
        if ((0, types_1.isFn)(values.toJS)) {
            return values;
        }
        if ((0, types_1.isFn)(values.toJSON)) {
            return values;
        }
        if (Object.getOwnPropertySymbols(values || {}).length) {
            return values;
        }
        const res = {};
        for (const key in values) {
            if (Object.hasOwnProperty.call(values, key)) {
                if ((0, types_1.isFn)(filter)) {
                    if (filter(values[key], key)) {
                        res[key] = (0, exports.clone)(values[key], filter);
                    }
                    else {
                        res[key] = values[key];
                    }
                }
                else {
                    res[key] = (0, exports.clone)(values[key], filter);
                }
            }
        }
        return res;
    }
    else {
        return values;
    }
};
exports.clone = clone;
