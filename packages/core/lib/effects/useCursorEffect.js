"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCursorEffect = void 0;
const models_1 = require("../models");
const events_1 = require("../events");
const shared_1 = require("@lowcode/shared");
const useCursorEffect = (engine) => {
    engine.subscribeTo(events_1.MouseMoveEvent, (event) => {
        engine.cursor.setStatus(engine.cursor.status === models_1.CursorStatus.Dragging ||
            engine.cursor.status === models_1.CursorStatus.DragStart
            ? engine.cursor.status
            : models_1.CursorStatus.Normal);
        if (engine.cursor.status === models_1.CursorStatus.Dragging)
            return;
        engine.cursor.setPosition(event.data);
    });
    engine.subscribeTo(events_1.DragStartEvent, (event) => {
        engine.cursor.setStatus(models_1.CursorStatus.DragStart);
        engine.cursor.setDragStartPosition(event.data);
    });
    engine.subscribeTo(events_1.DragMoveEvent, (event) => {
        engine.cursor.setStatus(models_1.CursorStatus.Dragging);
        engine.cursor.setPosition(event.data);
    });
    engine.subscribeTo(events_1.DragStopEvent, (event) => {
        engine.cursor.setStatus(models_1.CursorStatus.DragStop);
        engine.cursor.setDragEndPosition(event.data);
        engine.cursor.setDragStartPosition(null);
        (0, shared_1.requestIdle)(() => {
            engine.cursor.setStatus(models_1.CursorStatus.Normal);
        });
    });
    engine.subscribeTo(events_1.MouseMoveEvent, (event) => {
        var _a, _b;
        const currentWorkspace = (_a = event === null || event === void 0 ? void 0 : event.context) === null || _a === void 0 ? void 0 : _a.workspace;
        if (!currentWorkspace)
            return;
        const operation = currentWorkspace.operation;
        if (engine.cursor.status !== models_1.CursorStatus.Normal) {
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
exports.useCursorEffect = useCursorEffect;
