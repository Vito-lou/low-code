"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortcut = exports.KeyCode = void 0;
const shared_1 = require("@lowcode/shared");
Object.defineProperty(exports, "KeyCode", { enumerable: true, get: function () { return shared_1.KeyCode; } });
class Shortcut {
    constructor(props) {
        this.codes = this.parseCodes(props.codes);
        this.handler = props.handler;
        this.matcher = props.matcher;
    }
    parseCodes(codes) {
        const results = [];
        codes.forEach((code) => {
            if (Array.isArray(code)) {
                results.push(code);
            }
            else {
                results.push([code]);
            }
        });
        return results;
    }
    preventCodes(codes) {
        var _a;
        if (this.codes.length) {
            for (let i = 0; i < codes.length; i++) {
                const sequence = (_a = this.codes[i]) !== null && _a !== void 0 ? _a : [];
                for (let j = 0; j < sequence.length; j++) {
                    if (!Shortcut.matchCode(codes[j], sequence[j])) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
    matched(matched, context) {
        if ((0, shared_1.isFn)(this.handler) && matched) {
            this.handler(context);
        }
        return matched;
    }
    match(codes, context) {
        return this.codes.some((sequence) => {
            const sortedSelf = Shortcut.sortCodes(sequence);
            const sortedTarget = Shortcut.sortCodes(codes);
            if ((0, shared_1.isFn)(this.matcher)) {
                return this.matched(this.matcher(sortedTarget), context);
            }
            if (sortedTarget.length !== sortedSelf.length)
                return this.matched(false, context);
            for (let i = 0; i < sortedSelf.length; i++) {
                if (!Shortcut.matchCode(sortedTarget[i], sortedSelf[i])) {
                    return this.matched(false, context);
                }
            }
            return this.matched(true, context);
        });
    }
}
exports.Shortcut = Shortcut;
Shortcut.matchCode = (code1, code2) => {
    var _a, _b;
    return ((_a = code1 === null || code1 === void 0 ? void 0 : code1.toLocaleLowerCase) === null || _a === void 0 ? void 0 : _a.call(code1)) === ((_b = code2 === null || code2 === void 0 ? void 0 : code2.toLocaleLowerCase) === null || _b === void 0 ? void 0 : _b.call(code2));
};
Shortcut.sortCodes = (codes) => {
    return codes.map((code) => code.toLocaleLowerCase()).sort();
};
