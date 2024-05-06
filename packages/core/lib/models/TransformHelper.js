"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformHelper = void 0;
const shared_1 = require("@lowcode/shared");
const reactive_1 = require("@formily/reactive");
const SpaceBlock_1 = require("./SpaceBlock");
const TreeNode_1 = require("./TreeNode");
const SnapLine_1 = require("./SnapLine");
const Cursor_1 = require("./Cursor");
class TransformHelper {
    constructor(props) {
        this.dragNodes = [];
        this.rulerSnapLines = [];
        this.aroundSnapLines = [];
        this.aroundSpaceBlocks = null;
        this.viewportRectsStore = {};
        this.dragStartTranslateStore = {};
        this.dragStartSizeStore = {};
        this.dragStartNodesRect = null;
        this.snapping = false;
        this.dragging = false;
        this.snapped = false;
        this.operation = props.operation;
        this.makeObservable();
    }
    get tree() {
        return this.operation.tree;
    }
    get cursor() {
        return this.operation.engine.cursor;
    }
    get viewport() {
        return this.operation.workspace.viewport;
    }
    get deltaX() {
        return this.cursor.dragStartToCurrentDelta.clientX;
    }
    get deltaY() {
        return this.cursor.dragStartToCurrentDelta.clientY;
    }
    get cursorPosition() {
        const position = this.cursor.position;
        return this.operation.workspace.viewport.getOffsetPoint(new shared_1.Point(position.clientX, position.clientY));
    }
    get cursorDragNodesRect() {
        if (this.type === 'translate') {
            return new shared_1.Rect(this.cursorPosition.x - this.dragStartCursorOffset.x, this.cursorPosition.y - this.dragStartCursorOffset.y, this.dragNodesRect.width, this.dragNodesRect.height);
        }
        else if (this.type === 'resize') {
            const dragNodesRect = this.dragStartNodesRect;
            const deltaX = this.cursor.dragStartToCurrentDelta.clientX;
            const deltaY = this.cursor.dragStartToCurrentDelta.clientY;
            switch (this.direction) {
                case 'left-top':
                    return new shared_1.Rect(this.cursorPosition.x - this.dragStartCursorOffset.x, this.cursorPosition.y - this.dragStartCursorOffset.y, dragNodesRect.width - deltaX, dragNodesRect.height - deltaY);
                case 'left-center':
                    return new shared_1.Rect(this.cursorPosition.x - this.dragStartCursorOffset.x, dragNodesRect.y, dragNodesRect.width - deltaX, dragNodesRect.height);
                case 'left-bottom':
                    return new shared_1.Rect(this.cursorPosition.x - this.dragStartCursorOffset.x, dragNodesRect.y, dragNodesRect.width - deltaX, dragNodesRect.height - deltaY);
                case 'center-top':
                    return new shared_1.Rect(dragNodesRect.x, this.cursorPosition.y - this.dragStartCursorOffset.y, dragNodesRect.width, dragNodesRect.height - deltaY);
                case 'center-bottom':
                    return new shared_1.Rect(dragNodesRect.x, dragNodesRect.y, dragNodesRect.width, dragNodesRect.height + deltaY);
                case 'right-top':
                    return new shared_1.Rect(dragNodesRect.x, this.cursorPosition.y - this.dragStartCursorOffset.y, dragNodesRect.width + deltaX, dragNodesRect.height - deltaY);
                case 'right-center':
                    return new shared_1.Rect(dragNodesRect.x, dragNodesRect.y, dragNodesRect.width + deltaX, dragNodesRect.height);
                case 'right-bottom':
                    return new shared_1.Rect(dragNodesRect.x, dragNodesRect.y, dragNodesRect.width + deltaX, dragNodesRect.height - deltaY);
            }
        }
    }
    get cursorDragNodesEdgeLines() {
        return (0, shared_1.calcEdgeLinesOfRect)(this.cursorDragNodesRect);
    }
    get dragNodesRect() {
        if (this.draggingNodesRect)
            return this.draggingNodesRect;
        return (0, shared_1.calcBoundingRect)(this.dragNodes.map((node) => node.getValidElementOffsetRect()));
    }
    get dragNodesEdgeLines() {
        return (0, shared_1.calcEdgeLinesOfRect)(this.dragNodesRect);
    }
    get cursorOffset() {
        return new shared_1.Point(this.cursorPosition.x - this.dragNodesRect.x, this.cursorPosition.y - this.dragNodesRect.y);
    }
    get dragStartCursor() {
        const position = this.operation.engine.cursor.dragStartPosition;
        return this.operation.workspace.viewport.getOffsetPoint(new shared_1.Point(position.clientX, position.clientY));
    }
    get dragStartCursorOffset() {
        return new shared_1.Point(this.dragStartCursor.x - this.dragStartNodesRect.x, this.dragStartCursor.y - this.dragStartNodesRect.y);
    }
    get closestSnapLines() {
        if (!this.dragging)
            return [];
        const results = [];
        const cursorDragNodesEdgeLines = this.cursorDragNodesEdgeLines;
        this.thresholdSnapLines.forEach((line) => {
            const distance = (0, shared_1.calcDistanceOfSnapLineToEdges)(line, cursorDragNodesEdgeLines);
            if (distance < TransformHelper.threshold) {
                const existed = results.findIndex((l) => l.distance > distance &&
                    l.distance > 0 &&
                    l.direction === line.direction);
                if (existed > -1) {
                    results.splice(existed, 1);
                }
                results.push(line);
            }
        });
        return results;
    }
    get closestSpaceBlocks() {
        if (!this.dragging)
            return [];
        const cursorDragNodesEdgeLines = this.cursorDragNodesEdgeLines;
        return this.thresholdSpaceBlocks.filter((block) => {
            const line = block.snapLine;
            if (!line)
                return false;
            return ((0, shared_1.calcDistanceOfSnapLineToEdges)(line, cursorDragNodesEdgeLines) <
                TransformHelper.threshold);
        });
    }
    get thresholdSnapLines() {
        if (!this.dragging)
            return [];
        const lines = [];
        this.aroundSnapLines.forEach((line) => {
            lines.push(line);
        });
        this.rulerSnapLines.forEach((line) => {
            if (line.closest) {
                lines.push(line);
            }
        });
        for (let type in this.aroundSpaceBlocks) {
            const block = this.aroundSpaceBlocks[type];
            const line = block.snapLine;
            if (line) {
                lines.push(line);
            }
        }
        return lines;
    }
    get thresholdSpaceBlocks() {
        const results = [];
        if (!this.dragging)
            return [];
        for (let type in this.aroundSpaceBlocks) {
            const block = this.aroundSpaceBlocks[type];
            if (!block.snapLine)
                return [];
            if (block.snapLine.distance !== 0)
                return [];
            if (block.isometrics.length) {
                results.push(block);
                results.push(...block.isometrics);
            }
        }
        return results;
    }
    get measurerSpaceBlocks() {
        const results = [];
        if (!this.dragging || !this.snapped)
            return [];
        for (let type in this.aroundSpaceBlocks) {
            if (this.aroundSpaceBlocks[type])
                results.push(this.aroundSpaceBlocks[type]);
        }
        return results;
    }
    calcBaseTranslate(node) {
        var _a;
        const dragStartTranslate = (_a = this.dragStartTranslateStore[node.id]) !== null && _a !== void 0 ? _a : {
            x: 0,
            y: 0,
        };
        const x = dragStartTranslate.x + this.deltaX, y = dragStartTranslate.y + this.deltaY;
        return { x, y };
    }
    calcBaseResize(node) {
        var _a, _b;
        const deltaX = this.deltaX;
        const deltaY = this.deltaY;
        const dragStartTranslate = (_a = this.dragStartTranslateStore[node.id]) !== null && _a !== void 0 ? _a : {
            x: 0,
            y: 0,
        };
        const dragStartSize = (_b = this.dragStartSizeStore[node.id]) !== null && _b !== void 0 ? _b : {
            width: 0,
            height: 0,
        };
        switch (this.direction) {
            case 'left-top':
                return new shared_1.Rect(dragStartTranslate.x + deltaX, dragStartTranslate.y + deltaY, dragStartSize.width - deltaX, dragStartSize.height - deltaY);
            case 'left-center':
                return new shared_1.Rect(dragStartTranslate.x + deltaX, dragStartTranslate.y, dragStartSize.width - deltaX, dragStartSize.height);
            case 'left-bottom':
                return new shared_1.Rect(dragStartTranslate.x + deltaX, dragStartTranslate.y, dragStartSize.width - deltaX, dragStartSize.height + deltaY);
            case 'center-bottom':
                return new shared_1.Rect(dragStartTranslate.x, dragStartTranslate.y, dragStartSize.width, dragStartSize.height + deltaY);
            case 'center-top':
                return new shared_1.Rect(dragStartTranslate.x, dragStartTranslate.y + deltaY, dragStartSize.width, dragStartSize.height - deltaY);
            case 'right-top':
                return new shared_1.Rect(dragStartTranslate.x, dragStartTranslate.y + deltaY, dragStartSize.width + deltaX, dragStartSize.height - deltaY);
            case 'right-bottom':
                return new shared_1.Rect(dragStartTranslate.x, dragStartTranslate.y, dragStartSize.width + deltaX, dragStartSize.height + deltaY);
            case 'right-center':
                return new shared_1.Rect(dragStartTranslate.x, dragStartTranslate.y, dragStartSize.width + deltaX, dragStartSize.height);
        }
    }
    calcDragStartStore(nodes = []) {
        this.dragStartNodesRect = this.dragNodesRect;
        nodes.forEach((node) => {
            const element = node.getElement();
            const rect = node.getElementOffsetRect();
            this.dragStartTranslateStore[node.id] = (0, shared_1.calcElementTranslate)(element);
            this.dragStartSizeStore[node.id] = {
                width: rect.width,
                height: rect.height,
            };
        });
    }
    calcRulerSnapLines(dragNodesRect) {
        const edgeLines = (0, shared_1.calcEdgeLinesOfRect)(dragNodesRect);
        return this.rulerSnapLines.map((line) => {
            line.distance = (0, shared_1.calcDistanceOfSnapLineToEdges)(line, edgeLines);
            return line;
        });
    }
    calcAroundSnapLines(dragNodesRect) {
        const results = [];
        const edgeLines = (0, shared_1.calcEdgeLinesOfRect)(dragNodesRect);
        this.eachViewportNodes((refer, referRect) => {
            if (this.dragNodes.includes(refer))
                return;
            const referLines = (0, shared_1.calcEdgeLinesOfRect)(referRect);
            const add = (line) => {
                const [distance, edge] = (0, shared_1.calcClosestEdges)(line, edgeLines);
                const combined = (0, shared_1.calcCombineSnapLineSegment)(line, edge);
                if (distance < TransformHelper.threshold) {
                    if (this.snapping && distance !== 0)
                        return;
                    const snapLine = new SnapLine_1.SnapLine(this, Object.assign(Object.assign({}, combined), { distance }));
                    const edge = snapLine.snapEdge(dragNodesRect);
                    if (this.type === 'translate') {
                        results.push(snapLine);
                    }
                    else if (edge !== 'hc' && edge !== 'vc') {
                        results.push(snapLine);
                    }
                }
            };
            referLines.h.forEach(add);
            referLines.v.forEach(add);
        });
        return results;
    }
    calcAroundSpaceBlocks(dragNodesRect) {
        const closestSpaces = {};
        this.eachViewportNodes((refer, referRect) => {
            if ((0, shared_1.isEqualRect)(dragNodesRect, referRect))
                return;
            const origin = (0, shared_1.calcSpaceBlockOfRect)(dragNodesRect, referRect);
            if (origin) {
                const spaceBlock = new SpaceBlock_1.SpaceBlock(this, Object.assign({ refer }, origin));
                if (!closestSpaces[origin.type]) {
                    closestSpaces[origin.type] = spaceBlock;
                }
                else if (spaceBlock.distance < closestSpaces[origin.type].distance) {
                    closestSpaces[origin.type] = spaceBlock;
                }
            }
        });
        return closestSpaces;
    }
    calcViewportNodes() {
        this.tree.eachTree((node) => {
            const topRect = node.getValidElementRect();
            const offsetRect = node.getValidElementOffsetRect();
            if (this.dragNodes.includes(node))
                return;
            if (this.viewport.isRectInViewport(topRect)) {
                this.viewportRectsStore[node.id] = offsetRect;
            }
        });
    }
    getNodeRect(node) {
        return this.viewportRectsStore[node.id];
    }
    eachViewportNodes(visitor) {
        for (let id in this.viewportRectsStore) {
            visitor(this.tree.findById(id), this.viewportRectsStore[id]);
        }
    }
    translate(node, handler) {
        if (!this.dragging)
            return;
        const translate = this.calcBaseTranslate(node);
        this.snapped = false;
        this.snapping = false;
        for (let line of this.closestSnapLines) {
            line.translate(node, translate);
            this.snapping = true;
            this.snapped = true;
        }
        handler(translate);
        if (this.snapping) {
            this.dragMove();
            this.snapping = false;
        }
    }
    resize(node, handler) {
        if (!this.dragging)
            return;
        const rect = this.calcBaseResize(node);
        this.snapping = false;
        this.snapping = false;
        for (let line of this.closestSnapLines) {
            line.resize(node, rect);
            this.snapping = true;
            this.snapped = true;
        }
        handler(rect);
        if (this.snapping) {
            this.dragMove();
            this.snapping = false;
        }
    }
    // rotate(node: TreeNode, handler: (rotate: number) => void) {}
    // scale(node: TreeNode, handler: (scale: number) => void) {}
    // round(node: TreeNode, handler: (round: number) => void) {}
    findRulerSnapLine(id) {
        return this.rulerSnapLines.find((item) => item.id === id);
    }
    addRulerSnapLine(line) {
        if (!(0, shared_1.isLineSegment)(line))
            return;
        if (!this.findRulerSnapLine(line.id)) {
            this.rulerSnapLines.push(new SnapLine_1.SnapLine(this, Object.assign(Object.assign({}, line), { type: 'ruler' })));
        }
    }
    removeRulerSnapLine(id) {
        const matchedLineIndex = this.rulerSnapLines.findIndex((item) => item.id === id);
        if (matchedLineIndex > -1) {
            this.rulerSnapLines.splice(matchedLineIndex, 1);
        }
    }
    dragStart(props) {
        const dragNodes = props === null || props === void 0 ? void 0 : props.dragNodes;
        const type = props === null || props === void 0 ? void 0 : props.type;
        const direction = props === null || props === void 0 ? void 0 : props.direction;
        if (type === 'resize') {
            const nodes = TreeNode_1.TreeNode.filterResizable(dragNodes);
            if (nodes.length) {
                this.dragging = true;
                this.type = type;
                this.direction = direction;
                this.dragNodes = nodes;
                this.calcDragStartStore(nodes);
                this.cursor.setDragType(Cursor_1.CursorDragType.Resize);
            }
        }
        else if (type === 'translate') {
            const nodes = TreeNode_1.TreeNode.filterTranslatable(dragNodes);
            if (nodes.length) {
                this.dragging = true;
                this.type = type;
                this.direction = direction;
                this.dragNodes = nodes;
                this.calcDragStartStore(nodes);
                this.cursor.setDragType(Cursor_1.CursorDragType.Translate);
            }
        }
        else if (type === 'rotate') {
            const nodes = TreeNode_1.TreeNode.filterRotatable(dragNodes);
            if (nodes.length) {
                this.dragging = true;
                this.type = type;
                this.dragNodes = nodes;
                this.calcDragStartStore(nodes);
                this.cursor.setDragType(Cursor_1.CursorDragType.Rotate);
            }
        }
        else if (type === 'scale') {
            const nodes = TreeNode_1.TreeNode.filterScalable(dragNodes);
            if (nodes.length) {
                this.dragging = true;
                this.type = type;
                this.dragNodes = nodes;
                this.calcDragStartStore(nodes);
                this.cursor.setDragType(Cursor_1.CursorDragType.Scale);
            }
        }
        else if (type === 'round') {
            const nodes = TreeNode_1.TreeNode.filterRoundable(dragNodes);
            if (nodes.length) {
                this.dragging = true;
                this.type = type;
                this.dragNodes = nodes;
                this.calcDragStartStore(nodes);
                this.cursor.setDragType(Cursor_1.CursorDragType.Round);
            }
        }
        if (this.dragging) {
            this.calcViewportNodes();
        }
    }
    dragMove() {
        if (!this.dragging)
            return;
        this.draggingNodesRect = null;
        this.draggingNodesRect = this.dragNodesRect;
        this.rulerSnapLines = this.calcRulerSnapLines(this.dragNodesRect);
        this.aroundSnapLines = this.calcAroundSnapLines(this.dragNodesRect);
        this.aroundSpaceBlocks = this.calcAroundSpaceBlocks(this.dragNodesRect);
    }
    dragEnd() {
        this.dragging = false;
        this.viewportRectsStore = {};
        this.dragStartTranslateStore = {};
        this.aroundSnapLines = [];
        this.draggingNodesRect = null;
        this.aroundSpaceBlocks = null;
        this.dragStartNodesRect = null;
        this.dragNodes = [];
        this.cursor.setDragType(Cursor_1.CursorDragType.Move);
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            snapped: reactive_1.observable.ref,
            dragging: reactive_1.observable.ref,
            snapping: reactive_1.observable.ref,
            dragNodes: reactive_1.observable.ref,
            aroundSnapLines: reactive_1.observable.ref,
            aroundSpaceBlocks: reactive_1.observable.ref,
            rulerSnapLines: reactive_1.observable.shallow,
            closestSnapLines: reactive_1.observable.computed,
            thresholdSnapLines: reactive_1.observable.computed,
            thresholdSpaceBlocks: reactive_1.observable.computed,
            measurerSpaceBlocks: reactive_1.observable.computed,
            cursor: reactive_1.observable.computed,
            cursorPosition: reactive_1.observable.computed,
            cursorOffset: reactive_1.observable.computed,
            dragStartCursor: reactive_1.observable.computed,
            translate: reactive_1.action,
            dragStart: reactive_1.action,
            dragMove: reactive_1.action,
            dragEnd: reactive_1.action,
        });
    }
}
exports.TransformHelper = TransformHelper;
TransformHelper.threshold = 6;
