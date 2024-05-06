"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
const compose = (...fns) => {
    return (payload) => {
        return fns.reduce((buf, fn) => {
            return fn(buf);
        }, payload);
    };
};
exports.compose = compose;
