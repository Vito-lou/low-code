import { CursorType, KeyCode, Shortcut } from '../models';
export const CursorSwitchSelection = new Shortcut({
    codes: [KeyCode.Shift, KeyCode.S],
    handler(context) {
        const engine = context === null || context === void 0 ? void 0 : context.engine;
        if (engine) {
            engine.cursor.setType(CursorType.Selection);
        }
    },
});
