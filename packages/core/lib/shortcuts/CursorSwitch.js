"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorSwitchSelection = void 0;
const models_1 = require("../models");
exports.CursorSwitchSelection = new models_1.Shortcut({
    codes: [models_1.KeyCode.Shift, models_1.KeyCode.S],
    handler(context) {
        const engine = context === null || context === void 0 ? void 0 : context.engine;
        if (engine) {
            engine.cursor.setType(models_1.CursorType.Selection);
        }
    },
});
