"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedoMutation = exports.UndoMutation = void 0;
const models_1 = require("../models");
exports.UndoMutation = new models_1.Shortcut({
    codes: [
        [models_1.KeyCode.Meta, models_1.KeyCode.Z],
        [models_1.KeyCode.Control, models_1.KeyCode.Z],
    ],
    handler(context) {
        const workspace = context === null || context === void 0 ? void 0 : context.workspace;
        if (workspace) {
            workspace.history.undo();
        }
        workspace.operation.hover.clear();
    },
});
exports.RedoMutation = new models_1.Shortcut({
    codes: [
        [models_1.KeyCode.Meta, models_1.KeyCode.Shift, models_1.KeyCode.Z],
        [models_1.KeyCode.Control, models_1.KeyCode.Shift, models_1.KeyCode.Z],
    ],
    handler(context) {
        const workspace = context === null || context === void 0 ? void 0 : context.workspace;
        if (workspace) {
            workspace.history.redo();
        }
        workspace.operation.hover.clear();
    },
});
