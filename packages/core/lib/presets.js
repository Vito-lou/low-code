"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SHORTCUTS = exports.DEFAULT_DRIVERS = exports.DEFAULT_EFFECTS = void 0;
const drivers_1 = require("./drivers");
const effects_1 = require("./effects");
const shortcuts_1 = require("./shortcuts");
exports.DEFAULT_EFFECTS = [
    effects_1.useFreeSelectionEffect,
    effects_1.useCursorEffect,
    effects_1.useViewportEffect,
    effects_1.useDragDropEffect,
    effects_1.useSelectionEffect,
    effects_1.useKeyboardEffect,
    effects_1.useAutoScrollEffect,
    effects_1.useWorkspaceEffect,
    effects_1.useContentEditableEffect,
    effects_1.useTranslateEffect,
    effects_1.useResizeEffect,
];
exports.DEFAULT_DRIVERS = [
    drivers_1.MouseMoveDriver,
    drivers_1.DragDropDriver,
    drivers_1.MouseClickDriver,
    drivers_1.ViewportResizeDriver,
    drivers_1.ViewportScrollDriver,
    drivers_1.KeyboardDriver,
];
exports.DEFAULT_SHORTCUTS = [
    shortcuts_1.PreventCommandX,
    shortcuts_1.SelectNodes,
    shortcuts_1.SelectAllNodes,
    shortcuts_1.SelectSameTypeNodes,
    shortcuts_1.DeleteNodes,
    shortcuts_1.CopyNodes,
    shortcuts_1.PasteNodes,
    shortcuts_1.SelectPrevNode,
    shortcuts_1.SelectNextNode,
    shortcuts_1.UndoMutation,
    shortcuts_1.RedoMutation,
    shortcuts_1.CursorSwitchSelection,
];
