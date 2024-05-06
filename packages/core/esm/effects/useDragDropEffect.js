import { ClosestPosition, CursorType, CursorDragType, TreeNode, } from '../models';
import { DragStartEvent, DragMoveEvent, DragStopEvent, ViewportScrollEvent, } from '../events';
import { Point } from '@lowcode/shared';
export const useDragDropEffect = (engine) => {
    engine.subscribeTo(DragStartEvent, (event) => {
        if (engine.cursor.type !== CursorType.Normal)
            return;
        const target = event.data.target;
        const el = target === null || target === void 0 ? void 0 : target.closest(`
       *[${engine.props.nodeIdAttrName}],
       *[${engine.props.sourceIdAttrName}],
       *[${engine.props.outlineNodeIdAttrName}]
      `);
        const handler = target === null || target === void 0 ? void 0 : target.closest(`*[${engine.props.nodeDragHandlerAttrName}]`);
        const helper = handler === null || handler === void 0 ? void 0 : handler.closest(`*[${engine.props.nodeSelectionIdAttrName}]`);
        if (!(el === null || el === void 0 ? void 0 : el.getAttribute) && !handler)
            return;
        const sourceId = el === null || el === void 0 ? void 0 : el.getAttribute(engine.props.sourceIdAttrName);
        const outlineId = el === null || el === void 0 ? void 0 : el.getAttribute(engine.props.outlineNodeIdAttrName);
        const handlerId = helper === null || helper === void 0 ? void 0 : helper.getAttribute(engine.props.nodeSelectionIdAttrName);
        const nodeId = el === null || el === void 0 ? void 0 : el.getAttribute(engine.props.nodeIdAttrName);
        engine.workbench.eachWorkspace((currentWorkspace) => {
            const operation = currentWorkspace.operation;
            const moveHelper = operation.moveHelper;
            if (nodeId || outlineId || handlerId) {
                const node = engine.findNodeById(outlineId || nodeId || handlerId);
                if (node) {
                    if (!node.allowDrag())
                        return;
                    if (node === node.root)
                        return;
                    const validSelected = engine
                        .getAllSelectedNodes()
                        .filter((node) => node.allowDrag());
                    if (validSelected.some((selectNode) => selectNode === node)) {
                        moveHelper.dragStart({ dragNodes: TreeNode.sort(validSelected) });
                    }
                    else {
                        moveHelper.dragStart({ dragNodes: [node] });
                    }
                }
            }
            else if (sourceId) {
                const sourceNode = engine.findNodeById(sourceId);
                if (sourceNode) {
                    moveHelper.dragStart({ dragNodes: [sourceNode] });
                }
            }
        });
        engine.cursor.setStyle('move');
    });
    engine.subscribeTo(DragMoveEvent, (event) => {
        if (engine.cursor.type !== CursorType.Normal)
            return;
        if (engine.cursor.dragType !== CursorDragType.Move)
            return;
        const target = event.data.target;
        const el = target === null || target === void 0 ? void 0 : target.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `);
        const point = new Point(event.data.topClientX, event.data.topClientY);
        const nodeId = el === null || el === void 0 ? void 0 : el.getAttribute(engine.props.nodeIdAttrName);
        const outlineId = el === null || el === void 0 ? void 0 : el.getAttribute(engine.props.outlineNodeIdAttrName);
        engine.workbench.eachWorkspace((currentWorkspace) => {
            const operation = currentWorkspace.operation;
            const moveHelper = operation.moveHelper;
            const dragNodes = moveHelper.dragNodes;
            const tree = operation.tree;
            if (!dragNodes.length)
                return;
            const touchNode = tree.findById(outlineId || nodeId);
            moveHelper.dragMove({
                point,
                touchNode,
            });
        });
    });
    engine.subscribeTo(ViewportScrollEvent, (event) => {
        var _a, _b;
        if (engine.cursor.type !== CursorType.Normal)
            return;
        if (engine.cursor.dragType !== CursorDragType.Move)
            return;
        const point = new Point(engine.cursor.position.topClientX, engine.cursor.position.topClientY);
        const currentWorkspace = (_b = (_a = event === null || event === void 0 ? void 0 : event.context) === null || _a === void 0 ? void 0 : _a.workspace) !== null && _b !== void 0 ? _b : engine.workbench.activeWorkspace;
        if (!currentWorkspace)
            return;
        const operation = currentWorkspace.operation;
        const moveHelper = operation.moveHelper;
        if (!moveHelper.dragNodes.length)
            return;
        const tree = operation.tree;
        const viewport = currentWorkspace.viewport;
        const outline = currentWorkspace.outline;
        const viewportTarget = viewport.elementFromPoint(point);
        const outlineTarget = outline.elementFromPoint(point);
        const viewportNodeElement = viewportTarget === null || viewportTarget === void 0 ? void 0 : viewportTarget.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `);
        const outlineNodeElement = outlineTarget === null || outlineTarget === void 0 ? void 0 : outlineTarget.closest(`
    *[${engine.props.nodeIdAttrName}],
    *[${engine.props.outlineNodeIdAttrName}]
  `);
        const nodeId = viewportNodeElement === null || viewportNodeElement === void 0 ? void 0 : viewportNodeElement.getAttribute(engine.props.nodeIdAttrName);
        const outlineNodeId = outlineNodeElement === null || outlineNodeElement === void 0 ? void 0 : outlineNodeElement.getAttribute(engine.props.outlineNodeIdAttrName);
        const touchNode = tree.findById(outlineNodeId || nodeId);
        moveHelper.dragMove({ point, touchNode });
    });
    engine.subscribeTo(DragStopEvent, () => {
        if (engine.cursor.type !== CursorType.Normal)
            return;
        if (engine.cursor.dragType !== CursorDragType.Move)
            return;
        engine.workbench.eachWorkspace((currentWorkspace) => {
            const operation = currentWorkspace.operation;
            const moveHelper = operation.moveHelper;
            const dragNodes = moveHelper.dragNodes;
            const closestNode = moveHelper.closestNode;
            const closestDirection = moveHelper.closestDirection;
            const selection = operation.selection;
            if (!dragNodes.length)
                return;
            if (dragNodes.length && closestNode && closestDirection) {
                if (closestDirection === ClosestPosition.After ||
                    closestDirection === ClosestPosition.Under) {
                    if (closestNode.allowSibling(dragNodes)) {
                        selection.batchSafeSelect(closestNode.insertAfter(...TreeNode.filterDroppable(dragNodes, closestNode.parent)));
                    }
                }
                else if (closestDirection === ClosestPosition.Before ||
                    closestDirection === ClosestPosition.Upper) {
                    if (closestNode.allowSibling(dragNodes)) {
                        selection.batchSafeSelect(closestNode.insertBefore(...TreeNode.filterDroppable(dragNodes, closestNode.parent)));
                    }
                }
                else if (closestDirection === ClosestPosition.Inner ||
                    closestDirection === ClosestPosition.InnerAfter) {
                    if (closestNode.allowAppend(dragNodes)) {
                        selection.batchSafeSelect(closestNode.append(...TreeNode.filterDroppable(dragNodes, closestNode)));
                        moveHelper.dragDrop({ dropNode: closestNode });
                    }
                }
                else if (closestDirection === ClosestPosition.InnerBefore) {
                    if (closestNode.allowAppend(dragNodes)) {
                        selection.batchSafeSelect(closestNode.prepend(...TreeNode.filterDroppable(dragNodes, closestNode)));
                        moveHelper.dragDrop({ dropNode: closestNode });
                    }
                }
            }
            moveHelper.dragEnd();
        });
        engine.cursor.setStyle('');
    });
};
