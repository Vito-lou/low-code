"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTranslateEffect = void 0;
const models_1 = require("../models");
const events_1 = require("../events");
const useTranslateEffect = (engine) => {
    engine.subscribeTo(events_1.DragStartEvent, (event) => {
        var _a, _b;
        const target = event.data.target;
        const currentWorkspace = (_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.workspace) !== null && _b !== void 0 ? _b : engine.workbench.activeWorkspace;
        const handler = target === null || target === void 0 ? void 0 : target.closest(`*[${engine.props.nodeTranslateAttrName}]`);
        if (!currentWorkspace)
            return;
        const helper = currentWorkspace.operation.transformHelper;
        if (handler) {
            const type = handler.getAttribute(engine.props.nodeTranslateAttrName);
            if (type) {
                const selectionElement = handler.closest(`*[${engine.props.nodeSelectionIdAttrName}]`);
                if (selectionElement) {
                    const nodeId = selectionElement.getAttribute(engine.props.nodeSelectionIdAttrName);
                    if (nodeId) {
                        const node = engine.findNodeById(nodeId);
                        if (node) {
                            helper.dragStart({ dragNodes: [node], type: 'translate' });
                        }
                    }
                }
            }
        }
    });
    engine.subscribeTo(events_1.DragMoveEvent, (event) => {
        var _a, _b;
        if (engine.cursor.dragType !== models_1.CursorDragType.Translate)
            return;
        const currentWorkspace = (_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.workspace) !== null && _b !== void 0 ? _b : engine.workbench.activeWorkspace;
        const helper = currentWorkspace === null || currentWorkspace === void 0 ? void 0 : currentWorkspace.operation.transformHelper;
        const dragNodes = helper.dragNodes;
        if (!dragNodes.length)
            return;
        helper.dragMove();
        dragNodes.forEach((node) => {
            const element = node.getElement();
            helper.translate(node, (translate) => {
                element.style.position = 'absolute';
                element.style.left = '0px';
                element.style.top = '0px';
                element.style.transform = `translate3d(${translate.x}px,${translate.y}px,0)`;
            });
        });
    });
    engine.subscribeTo(events_1.DragStopEvent, (event) => {
        var _a, _b;
        if (engine.cursor.dragType !== models_1.CursorDragType.Translate)
            return;
        const currentWorkspace = (_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.workspace) !== null && _b !== void 0 ? _b : engine.workbench.activeWorkspace;
        const helper = currentWorkspace === null || currentWorkspace === void 0 ? void 0 : currentWorkspace.operation.transformHelper;
        if (helper) {
            helper.dragEnd();
        }
    });
};
exports.useTranslateEffect = useTranslateEffect;
