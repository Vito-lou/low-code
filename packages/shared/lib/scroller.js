"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollAnimate = exports.updateScrollValue = exports.calcAutoScrollBasicInfo = void 0;
const animation_1 = require("./animation");
const types_1 = require("./types");
// 他说是为了实现拖拽自动滚动的能力 loukai
const MAX_SPEED = 80; // px/s
const calcAutoScrollBasicInfo = (point, axis, viewport, maxSpeed = MAX_SPEED) => {
    const { left, right, top, bottom } = viewport;
    const { x, y } = point;
    let begin;
    let end;
    let pos;
    let speedFactor;
    if (axis === 'x') {
        begin = left;
        end = right;
        pos = x;
    }
    else {
        begin = top;
        end = bottom;
        pos = y;
    }
    const scrollerSize = end - begin;
    const moveDistance = scrollerSize > 400 ? 100 : scrollerSize / 3;
    if (end - pos < moveDistance) {
        return {
            direction: 'end',
            speedFactor,
            speed: maxSpeed * (0, animation_1.calcSpeedFactor)(end - pos, moveDistance),
        };
    }
    else if (pos - begin < moveDistance) {
        return {
            direction: 'begin',
            speedFactor,
            speed: maxSpeed * (0, animation_1.calcSpeedFactor)(pos - begin, moveDistance),
        };
    }
    return null;
};
exports.calcAutoScrollBasicInfo = calcAutoScrollBasicInfo;
const updateScrollValue = (element, axis, value, callback) => {
    if (element) {
        if (!(0, types_1.isWindow)(element)) {
            if (axis === 'x') {
                if (element.scrollLeft + value > element.scrollWidth)
                    return;
                element.scrollLeft += value;
                if ((0, types_1.isFn)(callback)) {
                    callback(element.scrollLeft);
                }
            }
            else {
                if (element.scrollTop + value > element.scrollHeight)
                    return;
                element.scrollTop += value;
                if ((0, types_1.isFn)(callback)) {
                    callback(element.scrollTop);
                }
            }
        }
        else {
            if (axis === 'x') {
                element.scrollBy({
                    left: value,
                    behavior: 'smooth',
                });
            }
            else {
                element.scrollBy({
                    top: value,
                    behavior: 'smooth',
                });
            }
            if ((0, types_1.isFn)(callback)) {
                callback(value);
            }
        }
    }
};
exports.updateScrollValue = updateScrollValue;
const scrollAnimate = (element, axis, direction, speed, callback) => {
    return (0, animation_1.createUniformSpeedAnimation)(speed, (delta) => {
        (0, exports.updateScrollValue)(element, axis, direction === 'begin' ? 0 - delta : delta, callback);
    });
};
exports.scrollAnimate = scrollAnimate;
