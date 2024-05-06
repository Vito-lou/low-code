"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcClosestEdges = exports.calcCombineSnapLineSegment = exports.calcDistanceOfSnapLineToEdges = exports.calcOffsetOfSnapLineSegmentToEdge = exports.calcExtendsLineSegmentOfRect = exports.calcSpaceBlockOfRect = exports.calcRectOfAxisLineSegment = exports.calcEdgeLinesOfRect = exports.calcRectByStartEndPoint = exports.calcBoundingRect = exports.calcRelativeOfPointToRect = exports.isNearAfter = exports.calcDistancePointToEdge = exports.calcDistanceOfPointToRect = exports.calcQuadrantOfPointToRect = exports.isCrossRectInRect = exports.isRectInRect = exports.getRectPoints = exports.isEqualRect = exports.isPointInRect = exports.RectQuadrant = exports.LineSegment = exports.Rect = exports.Point = exports.isLineSegment = exports.isPoint = exports.isRect = void 0;
/**这个是designable的核心文件之一，计算画布中的坐标位置，尤其和框选那个有关 */
const types_1 = require("./types");
function isRect(rect) {
    return (rect === null || rect === void 0 ? void 0 : rect.x) && (rect === null || rect === void 0 ? void 0 : rect.y) && (rect === null || rect === void 0 ? void 0 : rect.width) && (rect === null || rect === void 0 ? void 0 : rect.height);
}
exports.isRect = isRect;
function isPoint(val) {
    return (0, types_1.isValidNumber)(val === null || val === void 0 ? void 0 : val.x) && (0, types_1.isValidNumber)(val === null || val === void 0 ? void 0 : val.y);
}
exports.isPoint = isPoint;
function isLineSegment(val) {
    return isPoint(val === null || val === void 0 ? void 0 : val.start) && isPoint(val === null || val === void 0 ? void 0 : val.end);
}
exports.isLineSegment = isLineSegment;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Point = Point;
class Rect {
    constructor(x, y, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
    get top() {
        return this.y;
    }
    get bottom() {
        return this.y + this.height;
    }
}
exports.Rect = Rect;
class LineSegment {
    constructor(start, end) {
        this.start = Object.assign({}, start);
        this.end = Object.assign({}, end);
    }
}
exports.LineSegment = LineSegment;
var RectQuadrant;
(function (RectQuadrant) {
    RectQuadrant["Inner1"] = "I1";
    RectQuadrant["Inner2"] = "I2";
    RectQuadrant["Inner3"] = "I3";
    RectQuadrant["Inner4"] = "I4";
    RectQuadrant["Outer1"] = "O1";
    RectQuadrant["Outer2"] = "O2";
    RectQuadrant["Outer3"] = "O3";
    RectQuadrant["Outer4"] = "O4";
})(RectQuadrant || (exports.RectQuadrant = RectQuadrant = {}));
function isPointInRect(point, rect, sensitive = true) {
    const boundSensor = (value) => {
        if (!sensitive)
            return 0;
        const sensor = value * 0.1;
        if (sensor > 20)
            return 20;
        if (sensor < 10)
            return 10;
        return sensor;
    };
    return (point.x >= rect.x + boundSensor(rect.width) &&
        point.x <= rect.x + rect.width - boundSensor(rect.width) &&
        point.y >= rect.y + boundSensor(rect.height) &&
        point.y <= rect.y + rect.height - boundSensor(rect.height));
}
exports.isPointInRect = isPointInRect;
function isEqualRect(target, source) {
    return ((target === null || target === void 0 ? void 0 : target.x) === (source === null || source === void 0 ? void 0 : source.x) &&
        target.y === source.y &&
        target.width === source.width &&
        target.height === source.height);
}
exports.isEqualRect = isEqualRect;
function getRectPoints(source) {
    const p1 = new Point(source.x, source.y);
    const p2 = new Point(source.x + source.width, source.y);
    const p3 = new Point(source.x + source.width, source.y + source.height);
    const p4 = new Point(source.x, source.y + source.height);
    return [p1, p2, p3, p4];
}
exports.getRectPoints = getRectPoints;
function isRectInRect(target, source) {
    const [p1, p2, p3, p4] = getRectPoints(target);
    return (isPointInRect(p1, source, false) &&
        isPointInRect(p2, source, false) &&
        isPointInRect(p3, source, false) &&
        isPointInRect(p4, source, false));
}
exports.isRectInRect = isRectInRect;
function isCrossRectInRect(target, source) {
    const targetCenterPoint = new Point(target.x + target.width / 2, target.y + target.height / 2);
    const sourceCenterPoint = new Point(source.x + source.width / 2, source.y + source.height / 2);
    return (Math.abs(targetCenterPoint.x - sourceCenterPoint.x) <=
        target.width / 2 + source.width / 2 &&
        Math.abs(targetCenterPoint.y - sourceCenterPoint.y) <=
            target.height / 2 + source.height / 2);
}
exports.isCrossRectInRect = isCrossRectInRect;
/**
 * 计算点在矩形的哪个象限
 * @param point
 * @param rect
 */
function calcQuadrantOfPointToRect(point, rect) {
    const isInner = isPointInRect(point, rect);
    if (point.x <= rect.x + rect.width / 2) {
        if (point.y <= rect.y + rect.height / 2) {
            if (isInner) {
                return RectQuadrant.Inner1;
            }
            else {
                return RectQuadrant.Outer1;
            }
        }
        else {
            if (isInner) {
                return RectQuadrant.Inner4;
            }
            else {
                return RectQuadrant.Outer4;
            }
        }
    }
    else {
        if (point.y <= rect.y + rect.height / 2) {
            if (isInner) {
                return RectQuadrant.Inner2;
            }
            else {
                return RectQuadrant.Outer2;
            }
        }
        else {
            if (isInner) {
                return RectQuadrant.Inner3;
            }
            else {
                return RectQuadrant.Outer3;
            }
        }
    }
}
exports.calcQuadrantOfPointToRect = calcQuadrantOfPointToRect;
function calcDistanceOfPointToRect(point, rect) {
    let minX = Math.min(Math.abs(point.x - rect.x), Math.abs(point.x - (rect.x + rect.width)));
    let minY = Math.min(Math.abs(point.y - rect.y), Math.abs(point.y - (rect.y + rect.height)));
    if (point.x >= rect.x && point.x <= rect.x + rect.width) {
        minX = 0;
    }
    if (point.y >= rect.y && point.y <= rect.y + rect.height) {
        minY = 0;
    }
    return Math.sqrt(Math.pow(minX, 2) + Math.pow(minY, 2));
}
exports.calcDistanceOfPointToRect = calcDistanceOfPointToRect;
function calcDistancePointToEdge(point, rect) {
    const distanceTop = Math.abs(point.y - rect.y);
    const distanceBottom = Math.abs(point.y - (rect.y + rect.height));
    const distanceLeft = Math.abs(point.x - rect.x);
    const distanceRight = Math.abs(point.x - (rect.x + rect.width));
    return Math.min(distanceTop, distanceBottom, distanceLeft, distanceRight);
}
exports.calcDistancePointToEdge = calcDistancePointToEdge;
function isNearAfter(point, rect, inline = false) {
    if (inline) {
        return (Math.abs(point.x - rect.x) + Math.abs(point.y - rect.y) >
            Math.abs(point.x - (rect.x + rect.width)) +
                Math.abs(point.y - (rect.y + rect.height)));
    }
    return (Math.abs(point.y - rect.y) > Math.abs(point.y - (rect.y + rect.height)));
}
exports.isNearAfter = isNearAfter;
/**
 * 计算点鱼矩形的相对位置信息
 * @param point
 * @param rect
 */
function calcRelativeOfPointToRect(point, rect) {
    const distance = calcDistanceOfPointToRect(point, rect);
    const quadrant = calcQuadrantOfPointToRect(point, rect);
    return {
        quadrant,
        distance,
    };
}
exports.calcRelativeOfPointToRect = calcRelativeOfPointToRect;
function calcBoundingRect(rects) {
    if (!(rects === null || rects === void 0 ? void 0 : rects.length))
        return;
    if ((rects === null || rects === void 0 ? void 0 : rects.length) === 1 && !rects[0])
        return;
    let minTop = Infinity;
    let maxBottom = -Infinity;
    let minLeft = Infinity;
    let maxRight = -Infinity;
    rects.forEach((item) => {
        const rect = new Rect(item.x, item.y, item.width, item.height);
        if (rect.top <= minTop) {
            minTop = rect.top;
        }
        if (rect.bottom >= maxBottom) {
            maxBottom = rect.bottom;
        }
        if (rect.left <= minLeft) {
            minLeft = rect.left;
        }
        if (rect.right >= maxRight) {
            maxRight = rect.right;
        }
    });
    return new Rect(minLeft, minTop, maxRight - minLeft, maxBottom - minTop);
}
exports.calcBoundingRect = calcBoundingRect;
function calcRectByStartEndPoint(startPoint, endPoint, scrollX = 0, scrollY = 0) {
    let drawStartX = 0, drawStartY = 0;
    if (endPoint.x + scrollX >= startPoint.x &&
        endPoint.y + scrollY >= startPoint.y) {
        //4象限
        drawStartX = startPoint.x;
        drawStartY = startPoint.y;
        return new Rect(drawStartX - scrollX, drawStartY - scrollY, Math.abs(endPoint.x - startPoint.x + scrollX), Math.abs(endPoint.y - startPoint.y + scrollY));
    }
    else if (endPoint.x + scrollX < startPoint.x &&
        endPoint.y + scrollY < startPoint.y) {
        //1象限
        drawStartX = endPoint.x;
        drawStartY = endPoint.y;
        return new Rect(drawStartX, drawStartY, Math.abs(endPoint.x - startPoint.x + scrollX), Math.abs(endPoint.y - startPoint.y + scrollY));
    }
    else if (endPoint.x + scrollX < startPoint.x &&
        endPoint.y + scrollY >= startPoint.y) {
        //3象限
        drawStartX = endPoint.x;
        drawStartY = startPoint.y;
        return new Rect(drawStartX - scrollX, drawStartY - scrollY, Math.abs(endPoint.x - startPoint.x + scrollX), Math.abs(endPoint.y - startPoint.y + scrollY));
    }
    else {
        //2象限
        drawStartX = startPoint.x;
        drawStartY = endPoint.y;
        return new Rect(drawStartX, drawStartY, Math.abs(endPoint.x - startPoint.x + scrollX), Math.abs(endPoint.y - startPoint.y + scrollY));
    }
}
exports.calcRectByStartEndPoint = calcRectByStartEndPoint;
function calcEdgeLinesOfRect(rect) {
    return {
        v: [
            new LineSegment(new Point(rect.x, rect.y), new Point(rect.x, rect.y + rect.height)),
            new LineSegment(new Point(rect.x + rect.width / 2, rect.y), new Point(rect.x + rect.width / 2, rect.y + rect.height)),
            new LineSegment(new Point(rect.x + rect.width, rect.y), new Point(rect.x + rect.width, rect.y + rect.height)),
        ],
        h: [
            new LineSegment(new Point(rect.x, rect.y), new Point(rect.x + rect.width, rect.y)),
            new LineSegment(new Point(rect.x, rect.y + rect.height / 2), new Point(rect.x + rect.width, rect.y + rect.height / 2)),
            new LineSegment(new Point(rect.x, rect.y + rect.height), new Point(rect.x + rect.width, rect.y + rect.height)),
        ],
    };
}
exports.calcEdgeLinesOfRect = calcEdgeLinesOfRect;
function calcRectOfAxisLineSegment(line) {
    if (!isLineSegment(line))
        return;
    const isXAxis = line.start.x === line.end.x;
    return new Rect(line.start.x, line.start.y, isXAxis ? 0 : line.end.x - line.start.x, isXAxis ? line.end.y - line.start.y : 0);
}
exports.calcRectOfAxisLineSegment = calcRectOfAxisLineSegment;
function calcSpaceBlockOfRect(target, source, type) {
    const targetRect = new Rect(target.x, target.y, target.width, target.height);
    const sourceRect = new Rect(source.x, source.y, source.width, source.height);
    if (sourceRect.bottom < targetRect.top && sourceRect.left > targetRect.right)
        return;
    if (sourceRect.top > targetRect.bottom && sourceRect.left > targetRect.right)
        return;
    if (sourceRect.bottom < targetRect.top && sourceRect.right < targetRect.left)
        return;
    if (sourceRect.top > targetRect.bottom && sourceRect.right < targetRect.left)
        return;
    if (sourceRect.bottom < targetRect.top) {
        const distance = targetRect.top - sourceRect.bottom;
        const left = Math.min(sourceRect.left, targetRect.left);
        const right = Math.max(sourceRect.right, targetRect.right);
        if (type && type !== 'top')
            return;
        return {
            type: 'top',
            distance,
            rect: new Rect(left, sourceRect.bottom, right - left, distance),
        };
    }
    else if (sourceRect.top > targetRect.bottom) {
        const distance = sourceRect.top - targetRect.bottom;
        const left = Math.min(sourceRect.left, targetRect.left);
        const right = Math.max(sourceRect.right, targetRect.right);
        if (type && type !== 'bottom')
            return;
        return {
            type: 'bottom',
            distance,
            rect: new Rect(left, targetRect.bottom, right - left, distance),
        };
    }
    else if (sourceRect.right < targetRect.left) {
        const distance = targetRect.left - sourceRect.right;
        const top = Math.min(sourceRect.top, targetRect.top);
        const bottom = Math.max(sourceRect.bottom, targetRect.bottom);
        if (type && type !== 'left')
            return;
        return {
            type: 'left',
            distance,
            rect: new Rect(sourceRect.right, top, distance, bottom - top),
        };
    }
    else if (sourceRect.left > targetRect.right) {
        const distance = sourceRect.left - targetRect.right;
        const top = Math.min(sourceRect.top, targetRect.top);
        const bottom = Math.max(sourceRect.bottom, targetRect.bottom);
        if (type && type !== 'right')
            return;
        return {
            type: 'right',
            distance,
            rect: new Rect(targetRect.right, top, distance, bottom - top),
        };
    }
}
exports.calcSpaceBlockOfRect = calcSpaceBlockOfRect;
function calcExtendsLineSegmentOfRect(targetRect, referRect) {
    if (referRect.right < targetRect.right &&
        targetRect.left <= referRect.right) {
        //右侧
        if (referRect.bottom < targetRect.top) {
            //上方
            return {
                start: { x: referRect.right, y: referRect.bottom },
                end: { x: targetRect.right, y: referRect.bottom },
            };
        }
        else if (referRect.top > targetRect.bottom) {
            //下方
            return {
                start: { x: referRect.right, y: referRect.top },
                end: { x: targetRect.right, y: referRect.top },
            };
        }
    }
    else if (referRect.left > targetRect.left &&
        targetRect.right >= referRect.left) {
        //左侧
        if (referRect.bottom < targetRect.top) {
            //上方
            return {
                start: { x: targetRect.left, y: referRect.bottom },
                end: { x: referRect.left, y: referRect.bottom },
            };
        }
        else if (referRect.top > targetRect.bottom) {
            //下方
            return {
                start: { x: targetRect.left, y: referRect.top },
                end: { x: referRect.left, y: referRect.top },
            };
        }
    }
    if (referRect.top < targetRect.top && targetRect.bottom >= referRect.top) {
        //refer在上方
        if (referRect.right < targetRect.left) {
            //右侧
            return {
                start: { x: referRect.right, y: referRect.bottom },
                end: { x: referRect.right, y: targetRect.bottom },
            };
        }
        else if (referRect.left > targetRect.right) {
            //左侧
            return {
                start: { x: referRect.left, y: referRect.bottom },
                end: { x: referRect.left, y: targetRect.bottom },
            };
        }
    }
    else if (referRect.bottom > targetRect.bottom &&
        referRect.top <= targetRect.bottom) {
        //refer下方
        if (referRect.right < targetRect.left) {
            //右侧
            return {
                start: { x: referRect.right, y: targetRect.top },
                end: { x: referRect.right, y: referRect.top },
            };
        }
        else if (referRect.left > targetRect.right) {
            //左侧
            return {
                start: { x: referRect.left, y: targetRect.top },
                end: { x: referRect.left, y: referRect.top },
            };
        }
    }
}
exports.calcExtendsLineSegmentOfRect = calcExtendsLineSegmentOfRect;
function calcOffsetOfSnapLineSegmentToEdge(line, current) {
    const edges = calcEdgeLinesOfRect(current);
    const isVerticalLine = line.start.x === line.end.x;
    if (isVerticalLine) {
        return { x: calcMinDistanceValue(edges.x, line.start.x) - current.x, y: 0 };
    }
    function calcEdgeLinesOfRect(rect) {
        return {
            x: [rect.x, rect.x + rect.width / 2, rect.x + rect.width],
            y: [rect.y, rect.y + rect.height / 2, rect.y + rect.height],
        };
    }
    function calcMinDistanceValue(edges, targetValue) {
        let minDistance = Infinity, minDistanceIndex = -1;
        for (let i = 0; i < edges.length; i++) {
            const distance = Math.abs(edges[i] - targetValue);
            if (minDistance > distance) {
                minDistance = distance;
                minDistanceIndex = i;
            }
        }
        return edges[minDistanceIndex];
    }
    return { x: 0, y: calcMinDistanceValue(edges.y, line.start.y) - current.y };
}
exports.calcOffsetOfSnapLineSegmentToEdge = calcOffsetOfSnapLineSegmentToEdge;
function calcDistanceOfSnapLineToEdges(line, edges) {
    var _a, _b, _c, _d;
    let distance = Infinity;
    if (((_a = line === null || line === void 0 ? void 0 : line.start) === null || _a === void 0 ? void 0 : _a.y) === ((_b = line === null || line === void 0 ? void 0 : line.end) === null || _b === void 0 ? void 0 : _b.y)) {
        edges.h.forEach((target) => {
            const _distance = Math.abs(target.start.y - line.start.y);
            if (_distance < distance) {
                distance = _distance;
            }
        });
    }
    else if (((_c = line === null || line === void 0 ? void 0 : line.start) === null || _c === void 0 ? void 0 : _c.x) === ((_d = line === null || line === void 0 ? void 0 : line.end) === null || _d === void 0 ? void 0 : _d.x)) {
        edges.v.forEach((target) => {
            const _distance = Math.abs(target.start.x - line.start.x);
            if (_distance < distance) {
                distance = _distance;
            }
        });
    }
    else {
        throw new Error('can not calculate slash distance');
    }
    return distance;
}
exports.calcDistanceOfSnapLineToEdges = calcDistanceOfSnapLineToEdges;
function calcCombineSnapLineSegment(target, source) {
    if (target.start.x === target.end.x) {
        return new LineSegment(new Point(target.start.x, target.start.y > source.start.y ? source.start.y : target.start.y), new Point(target.start.x, target.end.y > source.end.y ? target.end.y : source.end.y));
    }
    return new LineSegment(new Point(target.start.x > source.start.x ? source.start.x : target.start.x, target.start.y), new Point(target.end.x > source.end.x ? target.end.x : source.end.x, target.end.y));
}
exports.calcCombineSnapLineSegment = calcCombineSnapLineSegment;
function calcClosestEdges(line, edges) {
    var _a, _b, _c, _d;
    let result;
    let distance = Infinity;
    if (((_a = line === null || line === void 0 ? void 0 : line.start) === null || _a === void 0 ? void 0 : _a.y) === ((_b = line === null || line === void 0 ? void 0 : line.end) === null || _b === void 0 ? void 0 : _b.y)) {
        edges.h.forEach((target) => {
            const _distance = Math.abs(target.start.y - line.start.y);
            if (_distance < distance) {
                distance = _distance;
                result = target;
            }
        });
    }
    else if (((_c = line === null || line === void 0 ? void 0 : line.start) === null || _c === void 0 ? void 0 : _c.x) === ((_d = line === null || line === void 0 ? void 0 : line.end) === null || _d === void 0 ? void 0 : _d.x)) {
        edges.v.forEach((target) => {
            const _distance = Math.abs(target.start.x - line.start.x);
            if (_distance < distance) {
                distance = _distance;
                result = target;
            }
        });
    }
    else {
        throw new Error('can not calculate slash distance');
    }
    return [distance, result];
}
exports.calcClosestEdges = calcClosestEdges;
