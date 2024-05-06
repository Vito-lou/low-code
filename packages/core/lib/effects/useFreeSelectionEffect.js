"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFreeSelectionEffect = void 0;
const events_1 = require("../events");
const models_1 = require("../models");
const shared_1 = require("@lowcode/shared");
const useFreeSelectionEffect = (engine) => {
    engine.subscribeTo(events_1.DragStopEvent, (event) => {
        if (engine.cursor.dragType !== models_1.CursorDragType.Move) {
            return;
        }
        engine.workbench.eachWorkspace((workspace) => {
            const viewport = workspace.viewport;
            const dragEndPoint = new shared_1.Point(event.data.topClientX, event.data.topClientY);
            const dragStartOffsetPoint = viewport.getOffsetPoint(new shared_1.Point(engine.cursor.dragStartPosition.topClientX, engine.cursor.dragStartPosition.topClientY));
            const dragEndOffsetPoint = viewport.getOffsetPoint(new shared_1.Point(engine.cursor.position.topClientX, engine.cursor.position.topClientY));
            if (!viewport.isPointInViewport(dragEndPoint, false))
                return;
            const tree = workspace.operation.tree;
            const selectionRect = (0, shared_1.calcRectByStartEndPoint)(dragStartOffsetPoint, dragEndOffsetPoint, viewport.dragScrollXDelta, viewport.dragScrollYDelta);
            const selected = [];
            tree.eachChildren((node) => {
                const nodeRect = viewport.getValidNodeOffsetRect(node);
                if (nodeRect && (0, shared_1.isCrossRectInRect)(selectionRect, nodeRect)) {
                    selected.push([node, nodeRect]);
                }
            });
            const selectedNodes = selected.reduce((buf, [node, nodeRect]) => {
                if ((0, shared_1.isRectInRect)(nodeRect, selectionRect)) {
                    if (selected.some(([selectNode]) => selectNode.isMyParents(node))) {
                        return buf;
                    }
                }
                return buf.concat(node);
            }, []);
            workspace.operation.selection.batchSafeSelect(selectedNodes);
        });
        if (engine.cursor.type === models_1.CursorType.Selection) {
            engine.cursor.setType(models_1.CursorType.Normal);
        }
    });
};
exports.useFreeSelectionEffect = useFreeSelectionEffect;
