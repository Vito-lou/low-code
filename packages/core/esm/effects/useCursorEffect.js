import { CursorStatus } from '../models';
import { MouseMoveEvent, DragStartEvent, DragMoveEvent, DragStopEvent, } from '../events';
import { requestIdle } from '@lowcode/shared';
export const useCursorEffect = (engine) => {
    engine.subscribeTo(MouseMoveEvent, (event) => {
        engine.cursor.setStatus(engine.cursor.status === CursorStatus.Dragging ||
            engine.cursor.status === CursorStatus.DragStart
            ? engine.cursor.status
            : CursorStatus.Normal);
        if (engine.cursor.status === CursorStatus.Dragging)
            return;
        engine.cursor.setPosition(event.data);
    });
    engine.subscribeTo(DragStartEvent, (event) => {
        engine.cursor.setStatus(CursorStatus.DragStart);
        engine.cursor.setDragStartPosition(event.data);
    });
    engine.subscribeTo(DragMoveEvent, (event) => {
        engine.cursor.setStatus(CursorStatus.Dragging);
        engine.cursor.setPosition(event.data);
    });
    engine.subscribeTo(DragStopEvent, (event) => {
        engine.cursor.setStatus(CursorStatus.DragStop);
        engine.cursor.setDragEndPosition(event.data);
        engine.cursor.setDragStartPosition(null);
        requestIdle(() => {
            engine.cursor.setStatus(CursorStatus.Normal);
        });
    });
    engine.subscribeTo(MouseMoveEvent, (event) => {
        var _a, _b;
        const currentWorkspace = (_a = event === null || event === void 0 ? void 0 : event.context) === null || _a === void 0 ? void 0 : _a.workspace;
        if (!currentWorkspace)
            return;
        const operation = currentWorkspace.operation;
        if (engine.cursor.status !== CursorStatus.Normal) {
            operation.hover.clear();
            return;
        }
        const target = event.data.target;
        const el = (_b = target === null || target === void 0 ? void 0 : target.closest) === null || _b === void 0 ? void 0 : _b.call(target, `
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `);
        if (!(el === null || el === void 0 ? void 0 : el.getAttribute)) {
            return;
        }
        const nodeId = el.getAttribute(engine.props.nodeIdAttrName);
        const outlineNodeId = el.getAttribute(engine.props.outlineNodeIdAttrName);
        const node = operation.tree.findById(nodeId || outlineNodeId);
        if (node) {
            operation.hover.setHover(node);
        }
        else {
            operation.hover.clear();
        }
    });
};
