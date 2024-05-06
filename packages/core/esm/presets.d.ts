import { DragDropDriver, MouseClickDriver, MouseMoveDriver, ViewportResizeDriver, ViewportScrollDriver, KeyboardDriver } from './drivers';
export declare const DEFAULT_EFFECTS: ((engine: import("./models").Engine) => void)[];
export declare const DEFAULT_DRIVERS: (typeof DragDropDriver | typeof MouseClickDriver | typeof MouseMoveDriver | typeof ViewportResizeDriver | typeof ViewportScrollDriver | typeof KeyboardDriver)[];
export declare const DEFAULT_SHORTCUTS: import("./models").Shortcut[];
