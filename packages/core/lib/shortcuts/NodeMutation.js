"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasteNodes = exports.CopyNodes = exports.DeleteNodes = void 0;
const models_1 = require("../models");
/**
 * 快捷删除，快捷复制粘贴
 */
exports.DeleteNodes = new models_1.Shortcut({
    codes: [[models_1.KeyCode.Backspace], [models_1.KeyCode.Delete]],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            models_1.TreeNode.remove(operation.selection.selectedNodes);
        }
    },
});
const Clipboard = {
    nodes: [],
};
exports.CopyNodes = new models_1.Shortcut({
    codes: [
        [models_1.KeyCode.Meta, models_1.KeyCode.C],
        [models_1.KeyCode.Control, models_1.KeyCode.C],
    ],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            Clipboard.nodes = operation.selection.selectedNodes;
        }
    },
});
exports.PasteNodes = new models_1.Shortcut({
    codes: [
        [models_1.KeyCode.Meta, models_1.KeyCode.V],
        [models_1.KeyCode.Control, models_1.KeyCode.V],
    ],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            models_1.TreeNode.clone(Clipboard.nodes);
        }
    },
});
