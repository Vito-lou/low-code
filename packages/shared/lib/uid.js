"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uid = void 0;
let IDX = 36, HEX = '';
while (IDX--)
    HEX += IDX.toString(36);
function uid(len) {
    let str = '', num = len || 11;
    while (num--)
        str += HEX[(Math.random() * 36) | 0];
    return str;
}
exports.uid = uid;
