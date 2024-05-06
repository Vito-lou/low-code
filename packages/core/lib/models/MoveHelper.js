"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveHelper = exports.ClosestPosition = void 0;
const TreeNode_1 = require("./TreeNode");
const reactive_1 = require("@formily/reactive");
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
const Cursor_1 = require("./Cursor");
var ClosestPosition;
(function (ClosestPosition) {
    ClosestPosition["Before"] = "BEFORE";
    ClosestPosition["ForbidBefore"] = "FORBID_BEFORE";
    ClosestPosition["After"] = "After";
    ClosestPosition["ForbidAfter"] = "FORBID_AFTER";
    ClosestPosition["Upper"] = "UPPER";
    ClosestPosition["ForbidUpper"] = "FORBID_UPPER";
    ClosestPosition["Under"] = "UNDER";
    ClosestPosition["ForbidUnder"] = "FORBID_UNDER";
    ClosestPosition["Inner"] = "INNER";
    ClosestPosition["ForbidInner"] = "FORBID_INNER";
    ClosestPosition["InnerAfter"] = "INNER_AFTER";
    ClosestPosition["ForbidInnerAfter"] = "FORBID_INNER_AFTER";
    ClosestPosition["InnerBefore"] = "INNER_BEFORE";
    ClosestPosition["ForbidInnerBefore"] = "FORBID_INNER_BEFORE";
    ClosestPosition["Forbid"] = "FORBID";
})(ClosestPosition || (exports.ClosestPosition = ClosestPosition = {}));
class MoveHelper {
    constructor(props) {
        this.dragNodes = [];
        this.touchNode = null;
        this.closestNode = null;
        this.activeViewport = null;
        this.viewportClosestRect = null;
        this.outlineClosestRect = null;
        this.viewportClosestOffsetRect = null;
        this.outlineClosestOffsetRect = null;
        this.viewportClosestDirection = null;
        this.outlineClosestDirection = null;
        this.dragging = false;
        this.operation = props.operation;
        this.rootNode = this.operation.tree;
        this.makeObservable();
    }
    get cursor() {
        return this.operation.engine.cursor;
    }
    get viewport() {
        return this.operation.workspace.viewport;
    }
    get outline() {
        return this.operation.workspace.outline;
    }
    get hasDragNodes() {
        return this.dragNodes.length > 0;
    }
    get closestDirection() {
        if (this.activeViewport === this.outline) {
            return this.outlineClosestDirection;
        }
        return this.viewportClosestDirection;
    }
    getClosestLayout(viewport) {
        return viewport.getValidNodeLayout(this.closestNode);
    }
    calcClosestPosition(point, viewport) {
        const closestNode = this.closestNode;
        if (!closestNode || !viewport.isPointInViewport(point))
            return ClosestPosition.Forbid;
        const closestRect = viewport.getValidNodeRect(closestNode);
        const isInline = this.getClosestLayout(viewport) === 'horizontal';
        if (!closestRect) {
            return;
        }
        const isAfter = (0, shared_1.isNearAfter)(point, closestRect, viewport.moveInsertionType === 'block' ? false : isInline);
        const getValidParent = (node) => {
            var _a;
            if (!node)
                return;
            if ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.allowSibling(this.dragNodes))
                return node.parent;
            return getValidParent(node.parent);
        };
        if ((0, shared_1.isPointInRect)(point, closestRect, viewport.moveSensitive)) {
            if (!closestNode.allowAppend(this.dragNodes)) {
                if (!closestNode.allowSibling(this.dragNodes)) {
                    const parentClosestNode = getValidParent(closestNode);
                    if (parentClosestNode) {
                        this.closestNode = parentClosestNode;
                    }
                    if (isInline) {
                        if (parentClosestNode) {
                            if (isAfter) {
                                return ClosestPosition.After;
                            }
                            return ClosestPosition.Before;
                        }
                        if (isAfter) {
                            return ClosestPosition.ForbidAfter;
                        }
                        return ClosestPosition.ForbidBefore;
                    }
                    else {
                        if (parentClosestNode) {
                            if (isAfter) {
                                return ClosestPosition.Under;
                            }
                            return ClosestPosition.Upper;
                        }
                        if (isAfter) {
                            return ClosestPosition.ForbidUnder;
                        }
                        return ClosestPosition.ForbidUpper;
                    }
                }
                else {
                    if (isInline) {
                        return isAfter ? ClosestPosition.After : ClosestPosition.Before;
                    }
                    else {
                        return isAfter ? ClosestPosition.Under : ClosestPosition.Upper;
                    }
                }
            }
            if (closestNode.contains(...this.dragNodes)) {
                if (isAfter) {
                    return ClosestPosition.InnerAfter;
                }
                return ClosestPosition.InnerBefore;
            }
            else {
                return ClosestPosition.Inner;
            }
        }
        else if (closestNode === closestNode.root) {
            return isAfter ? ClosestPosition.InnerAfter : ClosestPosition.InnerBefore;
        }
        else {
            if (!closestNode.allowSibling(this.dragNodes)) {
                const parentClosestNode = getValidParent(closestNode);
                if (parentClosestNode) {
                    this.closestNode = parentClosestNode;
                }
                if (isInline) {
                    if (parentClosestNode) {
                        if (isAfter) {
                            return ClosestPosition.After;
                        }
                        return ClosestPosition.Before;
                    }
                    return isAfter
                        ? ClosestPosition.ForbidAfter
                        : ClosestPosition.ForbidBefore;
                }
                else {
                    if (parentClosestNode) {
                        if (isAfter) {
                            return ClosestPosition.Under;
                        }
                        return ClosestPosition.Upper;
                    }
                    return isAfter
                        ? ClosestPosition.ForbidUnder
                        : ClosestPosition.ForbidUpper;
                }
            }
            if (isInline) {
                return isAfter ? ClosestPosition.After : ClosestPosition.Before;
            }
            else {
                return isAfter ? ClosestPosition.Under : ClosestPosition.Upper;
            }
        }
    }
    calcClosestNode(point, viewport) {
        var _a, _b;
        if (this.touchNode) {
            const touchNodeRect = viewport.getValidNodeRect(this.touchNode);
            if (!touchNodeRect)
                return;
            if ((_b = (_a = this.touchNode) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.length) {
                const touchDistance = (0, shared_1.calcDistancePointToEdge)(point, touchNodeRect);
                let minDistance = touchDistance;
                let minDistanceNode = this.touchNode;
                this.touchNode.eachChildren((node) => {
                    const rect = viewport.getElementRectById(node.id);
                    if (!rect)
                        return;
                    const distance = (0, shared_1.isPointInRect)(point, rect, viewport.moveSensitive)
                        ? 0
                        : (0, shared_1.calcDistanceOfPointToRect)(point, rect);
                    if (distance <= minDistance) {
                        minDistance = distance;
                        minDistanceNode = node;
                    }
                });
                return minDistanceNode;
            }
            else {
                return this.touchNode;
            }
        }
        return this.operation.tree;
    }
    calcClosestRect(viewport, closestDirection) {
        const closestNode = this.closestNode;
        if (!closestNode || !closestDirection)
            return;
        const closestRect = viewport.getValidNodeRect(closestNode);
        if (closestDirection === ClosestPosition.InnerAfter ||
            closestDirection === ClosestPosition.InnerBefore) {
            return viewport.getChildrenRect(closestNode);
        }
        else {
            return closestRect;
        }
    }
    calcClosestOffsetRect(viewport, closestDirection) {
        const closestNode = this.closestNode;
        if (!closestNode || !closestDirection)
            return;
        const closestRect = viewport.getValidNodeOffsetRect(closestNode);
        if (closestDirection === ClosestPosition.InnerAfter ||
            closestDirection === ClosestPosition.InnerBefore) {
            return viewport.getChildrenOffsetRect(closestNode);
        }
        else {
            return closestRect;
        }
    }
    dragStart(props) {
        const nodes = TreeNode_1.TreeNode.filterDraggable(props === null || props === void 0 ? void 0 : props.dragNodes);
        if (nodes.length) {
            this.dragNodes = nodes;
            this.trigger(new events_1.DragNodeEvent({
                target: this.operation.tree,
                source: this.dragNodes,
            }));
            this.viewport.cacheElements();
            this.cursor.setDragType(Cursor_1.CursorDragType.Move);
            this.dragging = true;
        }
    }
    dragMove(props) {
        const { point, touchNode } = props;
        if (!this.dragging)
            return;
        if (this.outline.isPointInViewport(point, false)) {
            this.activeViewport = this.outline;
            this.touchNode = touchNode;
            this.closestNode = this.calcClosestNode(point, this.outline);
        }
        else if (this.viewport.isPointInViewport(point, false)) {
            this.activeViewport = this.viewport;
            this.touchNode = touchNode;
            this.closestNode = this.calcClosestNode(point, this.viewport);
        }
        if (!this.activeViewport)
            return;
        if (this.activeViewport === this.outline) {
            this.outlineClosestDirection = this.calcClosestPosition(point, this.outline);
            this.viewportClosestDirection = this.outlineClosestDirection;
        }
        else {
            this.viewportClosestDirection = this.calcClosestPosition(point, this.viewport);
            this.outlineClosestDirection = this.viewportClosestDirection;
        }
        if (this.outline.mounted) {
            this.outlineClosestRect = this.calcClosestRect(this.outline, this.outlineClosestDirection);
            this.outlineClosestOffsetRect = this.calcClosestOffsetRect(this.outline, this.outlineClosestDirection);
        }
        if (this.viewport.mounted) {
            this.viewportClosestRect = this.calcClosestRect(this.viewport, this.viewportClosestDirection);
            this.viewportClosestOffsetRect = this.calcClosestOffsetRect(this.viewport, this.viewportClosestDirection);
        }
    }
    dragDrop(props) {
        this.trigger(new events_1.DropNodeEvent({
            target: this.operation.tree,
            source: props === null || props === void 0 ? void 0 : props.dropNode,
        }));
    }
    dragEnd() {
        this.dragging = false;
        this.dragNodes = [];
        this.touchNode = null;
        this.closestNode = null;
        this.activeViewport = null;
        this.outlineClosestDirection = null;
        this.outlineClosestOffsetRect = null;
        this.outlineClosestRect = null;
        this.viewportClosestDirection = null;
        this.viewportClosestOffsetRect = null;
        this.viewportClosestRect = null;
        this.viewport.clearCache();
    }
    trigger(event) {
        if (this.operation) {
            return this.operation.dispatch(event);
        }
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            dragging: reactive_1.observable.ref,
            dragNodes: reactive_1.observable.ref,
            touchNode: reactive_1.observable.ref,
            closestNode: reactive_1.observable.ref,
            outlineClosestDirection: reactive_1.observable.ref,
            outlineClosestOffsetRect: reactive_1.observable.ref,
            outlineClosestRect: reactive_1.observable.ref,
            viewportClosestDirection: reactive_1.observable.ref,
            viewportClosestOffsetRect: reactive_1.observable.ref,
            viewportClosestRect: reactive_1.observable.ref,
            dragStart: reactive_1.action,
            dragMove: reactive_1.action,
            dragEnd: reactive_1.action,
        });
    }
}
exports.MoveHelper = MoveHelper;
