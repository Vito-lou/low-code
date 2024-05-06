import { KeyCode, Shortcut, TreeNode } from '../models';
/**
 * 快捷删除，快捷复制粘贴
 */
export const DeleteNodes = new Shortcut({
    codes: [[KeyCode.Backspace], [KeyCode.Delete]],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            TreeNode.remove(operation.selection.selectedNodes);
        }
    },
});
const Clipboard = {
    nodes: [],
};
export const CopyNodes = new Shortcut({
    codes: [
        [KeyCode.Meta, KeyCode.C],
        [KeyCode.Control, KeyCode.C],
    ],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            Clipboard.nodes = operation.selection.selectedNodes;
        }
    },
});
export const PasteNodes = new Shortcut({
    codes: [
        [KeyCode.Meta, KeyCode.V],
        [KeyCode.Control, KeyCode.V],
    ],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            TreeNode.clone(Clipboard.nodes);
        }
    },
});
