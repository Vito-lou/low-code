"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectAllNodes = exports.PreventCommandX = exports.SelectSameTypeNodes = exports.SelectNodes = void 0;
const models_1 = require("../models");
exports.SelectNodes = new models_1.Shortcut({
    codes: [[models_1.KeyCode.Meta], [models_1.KeyCode.Control]],
});
exports.SelectSameTypeNodes = new models_1.Shortcut({
    codes: [models_1.KeyCode.Shift],
});
exports.PreventCommandX = new models_1.Shortcut({
    codes: [
        [models_1.KeyCode.Meta, models_1.KeyCode.X],
        [models_1.KeyCode.Control, models_1.KeyCode.X],
    ],
});
exports.SelectAllNodes = new models_1.Shortcut({
    codes: [
        [models_1.KeyCode.Meta, models_1.KeyCode.A],
        [models_1.KeyCode.Control, models_1.KeyCode.A],
    ],
    handler(context) {
        const operation = context === null || context === void 0 ? void 0 : context.workspace.operation;
        if (operation) {
            const tree = operation.tree;
            const selection = operation.selection;
            selection.batchSelect(tree.descendants);
        }
    },
});
