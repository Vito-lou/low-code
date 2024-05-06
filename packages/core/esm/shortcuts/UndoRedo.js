import { KeyCode, Shortcut } from '../models';
export const UndoMutation = new Shortcut({
    codes: [
        [KeyCode.Meta, KeyCode.Z],
        [KeyCode.Control, KeyCode.Z],
    ],
    handler(context) {
        const workspace = context === null || context === void 0 ? void 0 : context.workspace;
        if (workspace) {
            workspace.history.undo();
        }
        workspace.operation.hover.clear();
    },
});
export const RedoMutation = new Shortcut({
    codes: [
        [KeyCode.Meta, KeyCode.Shift, KeyCode.Z],
        [KeyCode.Control, KeyCode.Shift, KeyCode.Z],
    ],
    handler(context) {
        const workspace = context === null || context === void 0 ? void 0 : context.workspace;
        if (workspace) {
            workspace.history.redo();
        }
        workspace.operation.hover.clear();
    },
});
