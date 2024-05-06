import { KeyCode, Shortcut } from '../models';
const findBottomLastChild = (node) => {
    if (!node)
        return node;
    if (node.lastChild) {
        return findBottomLastChild(node.lastChild);
    }
    return node;
};
const findTopParentNext = (node) => {
    var _a;
    if (!node.parent)
        return node;
    if ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.next)
        return node.parent.next;
    return findTopParentNext(node.parent);
};
export const SelectPrevNode = new Shortcut({
    codes: [
        [KeyCode.Up],
        [KeyCode.PageUp],
        [KeyCode.ArrowUp],
        [KeyCode.Left],
        [KeyCode.LeftWindowKey],
        [KeyCode.ArrowLeft],
    ],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            const tree = operation.tree;
            const selection = operation.selection;
            const selectedNode = tree.findById(selection.last);
            if (selectedNode) {
                const previousNode = selectedNode.previous;
                if (previousNode) {
                    const bottom = findBottomLastChild(previousNode);
                    if (bottom) {
                        selection.select(bottom);
                    }
                    else {
                        selection.select(previousNode);
                    }
                }
                else if (selectedNode.parent) {
                    selection.select(selectedNode.parent);
                }
                else {
                    const bottom = findBottomLastChild(selectedNode.lastChild);
                    if (bottom) {
                        selection.select(bottom);
                    }
                }
            }
        }
    },
});
export const SelectNextNode = new Shortcut({
    codes: [
        [KeyCode.Down],
        [KeyCode.PageDown],
        [KeyCode.ArrowDown],
        [KeyCode.Right],
        [KeyCode.RightWindowKey],
        [KeyCode.ArrowRight],
    ],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            const tree = operation.tree;
            const selection = operation.selection;
            const selectedNode = tree.findById(selection.last);
            if (selectedNode) {
                const nextNode = selectedNode.firstChild
                    ? selectedNode.firstChild
                    : selectedNode.next;
                if (nextNode) {
                    selection.select(nextNode);
                }
                else {
                    selection.select(findTopParentNext(selectedNode));
                }
            }
        }
    },
});
