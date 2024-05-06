"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapLine = void 0;
const shared_1 = require("@lowcode/shared");
const TransformHelper_1 = require("./TransformHelper");
class SnapLine {
    constructor(helper, line) {
        this.helper = helper;
        this.type = line.type || 'normal';
        this._id = line.id;
        this.refer = line.refer;
        this.start = Object.assign({}, line.start);
        this.end = Object.assign({}, line.end);
        this.distance = line.distance;
    }
    get id() {
        var _a;
        return ((_a = this._id) !== null && _a !== void 0 ? _a : `${this.start.x}-${this.start.y}-${this.end.x}-${this.end.y}`);
    }
    get direction() {
        var _a, _b;
        if (((_a = this.start) === null || _a === void 0 ? void 0 : _a.x) === ((_b = this.end) === null || _b === void 0 ? void 0 : _b.x))
            return 'v';
        return 'h';
    }
    get closest() {
        return this.distance < TransformHelper_1.TransformHelper.threshold;
    }
    get rect() {
        return (0, shared_1.calcRectOfAxisLineSegment)(this);
    }
    translate(node, translate) {
        if (!node || !(node === null || node === void 0 ? void 0 : node.parent))
            return;
        const parent = node.parent;
        const dragNodeRect = node.getValidElementOffsetRect();
        const parentRect = parent.getValidElementOffsetRect();
        const edgeOffset = (0, shared_1.calcOffsetOfSnapLineSegmentToEdge)(this, dragNodeRect);
        if (this.direction === 'h') {
            translate.y = this.start.y - parentRect.y - edgeOffset.y;
        }
        else {
            translate.x = this.start.x - parentRect.x - edgeOffset.x;
        }
    }
    resize(node, rect) {
        if (!node || !(node === null || node === void 0 ? void 0 : node.parent))
            return;
        const parent = node.parent;
        const dragNodeRect = node.getValidElementOffsetRect();
        const parentRect = parent.getValidElementOffsetRect();
        const edgeOffset = (0, shared_1.calcOffsetOfSnapLineSegmentToEdge)(this, dragNodeRect);
        const cursorRect = this.helper.cursorDragNodesRect;
        const snapEdge = this.snapEdge(rect);
        if (this.direction === 'h') {
            const y = this.start.y - parentRect.y - edgeOffset.y;
            switch (this.helper.direction) {
                case 'left-top':
                case 'center-top':
                case 'right-top':
                    if (snapEdge !== 'ht')
                        return;
                    rect.y = y;
                    rect.height = cursorRect.bottom - y;
                    break;
                case 'left-bottom':
                case 'center-bottom':
                case 'right-bottom':
                    if (snapEdge !== 'hb')
                        return;
                    rect.height = this.start.y - cursorRect.top;
                    break;
            }
        }
        else {
            const x = this.start.x - parentRect.x - edgeOffset.x;
            switch (this.helper.direction) {
                case 'left-top':
                case 'left-bottom':
                case 'left-center':
                    if (snapEdge !== 'vl')
                        return;
                    rect.x = x;
                    rect.width = cursorRect.right - x;
                    break;
                case 'right-center':
                case 'right-top':
                case 'right-bottom':
                    if (snapEdge !== 'vr')
                        return;
                    rect.width = this.start.x - cursorRect.left;
                    break;
            }
        }
    }
    snapEdge(rect) {
        const threshold = TransformHelper_1.TransformHelper.threshold;
        if (this.direction === 'h') {
            if (Math.abs(this.start.y - rect.top) < threshold)
                return 'ht';
            if (Math.abs(this.start.y - (rect.top + rect.height / 2)) < threshold)
                return 'hc';
            if (Math.abs(this.start.y - rect.bottom) < threshold)
                return 'hb';
        }
        else {
            if (Math.abs(this.start.x - rect.left) < threshold)
                return 'vl';
            if (Math.abs(this.start.x - (rect.left + rect.width / 2)) < threshold)
                return 'vc';
            if (Math.abs(this.start.x - rect.right) < threshold)
                return 'vr';
        }
    }
}
exports.SnapLine = SnapLine;
