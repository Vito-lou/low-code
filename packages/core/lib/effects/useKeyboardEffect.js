"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboardEffect = void 0;
const events_1 = require("../events");
const useKeyboardEffect = (engine) => {
    engine.subscribeTo(events_1.KeyDownEvent, (event) => {
        const keyboard = engine.keyboard;
        if (!keyboard)
            return;
        const workspace = engine.workbench.activeWorkspace || engine.workbench.currentWorkspace;
        keyboard.handleKeyboard(event, workspace.getEventContext());
    });
    engine.subscribeTo(events_1.KeyUpEvent, (event) => {
        const keyboard = engine.keyboard;
        if (!keyboard)
            return;
        const workspace = engine.workbench.activeWorkspace || engine.workbench.currentWorkspace;
        keyboard.handleKeyboard(event, workspace.getEventContext());
    });
};
exports.useKeyboardEffect = useKeyboardEffect;
