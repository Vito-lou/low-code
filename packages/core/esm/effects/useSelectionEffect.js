import { CursorStatus } from '../models';
import { MouseClickEvent } from '../events';
import { KeyCode, Point } from '@lowcode/shared';
export const useSelectionEffect = (engine) => {
    engine.subscribeTo(MouseClickEvent, (event) => {
        var _a, _b, _c, _d;
        if (engine.cursor.status !== CursorStatus.Normal)
            return;
        const target = event.data.target;
        const el = (_a = target === null || target === void 0 ? void 0 : target.closest) === null || _a === void 0 ? void 0 : _a.call(target, `
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `);
        const isHelpers = (_b = target === null || target === void 0 ? void 0 : target.closest) === null || _b === void 0 ? void 0 : _b.call(target, `*[${engine.props.nodeSelectionIdAttrName}]`);
        const currentWorkspace = (_d = (_c = event.context) === null || _c === void 0 ? void 0 : _c.workspace) !== null && _d !== void 0 ? _d : engine.workbench.activeWorkspace;
        if (!currentWorkspace)
            return;
        if (!(el === null || el === void 0 ? void 0 : el.getAttribute)) {
            const point = new Point(event.data.topClientX, event.data.topClientY);
            const operation = currentWorkspace.operation;
            const viewport = currentWorkspace.viewport;
            const outline = currentWorkspace.outline;
            const isInViewport = viewport.isPointInViewport(point, false);
            const isInOutline = outline.isPointInViewport(point, false);
            if (isHelpers)
                return;
            if (isInViewport || isInOutline) {
                const selection = operation.selection;
                const tree = operation.tree;
                selection.select(tree);
            }
            return;
        }
        const nodeId = el.getAttribute(engine.props.nodeIdAttrName);
        const structNodeId = el.getAttribute(engine.props.outlineNodeIdAttrName);
        const operation = currentWorkspace.operation;
        const selection = operation.selection;
        const tree = operation.tree;
        const node = tree.findById(nodeId || structNodeId);
        if (node) {
            engine.keyboard.requestClean();
            if (engine.keyboard.isKeyDown(KeyCode.Meta) ||
                engine.keyboard.isKeyDown(KeyCode.Control)) {
                if (selection.has(node)) {
                    if (selection.selected.length > 1) {
                        selection.remove(node);
                    }
                }
                else {
                    selection.add(node);
                }
            }
            else if (engine.keyboard.isKeyDown(KeyCode.Shift)) {
                if (selection.has(node)) {
                    if (selection.selected.length > 1) {
                        selection.remove(node);
                    }
                }
                else {
                    selection.crossAddTo(node);
                }
            }
            else {
                selection.select(node);
            }
        }
        else {
            selection.select(tree);
        }
    });
};
