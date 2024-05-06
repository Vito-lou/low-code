"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizeEffect = void 0;
const models_1 = require("../models");
const events_1 = require("../events");
const useResizeEffect = (engine) => {
    const findStartNodeHandler = (target) => {
        const handler = target === null || target === void 0 ? void 0 : target.closest(`*[${engine.props.nodeResizeHandlerAttrName}]`);
        if (handler) {
            const direction = handler.getAttribute(engine.props.nodeResizeHandlerAttrName);
            if (direction) {
                const element = handler.closest(`*[${engine.props.nodeSelectionIdAttrName}]`);
                if (element) {
                    const nodeId = element.getAttribute(engine.props.nodeSelectionIdAttrName);
                    if (nodeId) {
                        const node = engine.findNodeById(nodeId);
                        if (node) {
                            return { direction, node, element };
                        }
                    }
                }
            }
        }
        return;
    };
    engine.subscribeTo(events_1.DragStartEvent, (event) => {
        var _a, _b;
        const target = event.data.target;
        const currentWorkspace = (_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.workspace) !== null && _b !== void 0 ? _b : engine.workbench.activeWorkspace;
        if (!currentWorkspace)
            return;
        const handler = findStartNodeHandler(target);
        const helper = currentWorkspace.operation.transformHelper;
        if (handler) {
            const selectionElement = handler.element.closest(`*[${engine.props.nodeSelectionIdAttrName}]`);
            if (selectionElement) {
                const nodeId = selectionElement.getAttribute(engine.props.nodeSelectionIdAttrName);
                if (nodeId) {
                    const node = engine.findNodeById(nodeId);
                    if (node) {
                        helper.dragStart({
                            dragNodes: [node],
                            type: 'resize',
                            direction: handler.direction,
                        });
                    }
                }
            }
        }
    });
    engine.subscribeTo(events_1.DragMoveEvent, (event) => {
        var _a, _b;
        if (engine.cursor.dragType !== models_1.CursorDragType.Resize)
            return;
        const currentWorkspace = (_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.workspace) !== null && _b !== void 0 ? _b : engine.workbench.activeWorkspace;
        const helper = currentWorkspace === null || currentWorkspace === void 0 ? void 0 : currentWorkspace.operation.transformHelper;
        const dragNodes = helper.dragNodes;
        if (!dragNodes.length)
            return;
        helper.dragMove();
        dragNodes.forEach((node) => {
            const element = node.getElement();
            helper.resize(node, (rect) => {
                element.style.width = rect.width + 'px';
                element.style.height = rect.height + 'px';
                element.style.position = 'absolute';
                element.style.left = '0px';
                element.style.top = '0px';
                element.style.transform = `translate3d(${rect.x}px,${rect.y}px,0)`;
            });
        });
    });
    engine.subscribeTo(events_1.DragStopEvent, (event) => {
        var _a, _b;
        if (engine.cursor.dragType !== models_1.CursorDragType.Resize)
            return;
        const currentWorkspace = (_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.workspace) !== null && _b !== void 0 ? _b : engine.workbench.activeWorkspace;
        const helper = currentWorkspace === null || currentWorkspace === void 0 ? void 0 : currentWorkspace.operation.transformHelper;
        if (helper) {
            helper.dragEnd();
        }
    });
};
exports.useResizeEffect = useResizeEffect;
