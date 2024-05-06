import { Engine } from './Engine';
export declare enum CursorStatus {
    Normal = "NORMAL",
    DragStart = "DRAG_START",
    Dragging = "DRAGGING",
    DragStop = "DRAG_STOP"
}
export declare enum CursorDragType {
    Move = "MOVE",
    Resize = "RESIZE",
    Rotate = "ROTATE",
    Scale = "SCALE",
    Translate = "TRANSLATE",
    Round = "ROUND"
}
export declare enum CursorType {
    Normal = "NORMAL",
    Selection = "SELECTION",
    Sketch = "SKETCH"
}
export interface ICursorPosition {
    pageX?: number;
    pageY?: number;
    clientX?: number;
    clientY?: number;
    topPageX?: number;
    topPageY?: number;
    topClientX?: number;
    topClientY?: number;
}
export interface ICursor {
    status?: CursorStatus;
    position?: ICursorPosition;
    dragStartPosition?: ICursorPosition;
    dragEndPosition?: ICursorPosition;
    view?: Window;
}
export declare class Cursor {
    engine: Engine;
    type: CursorType | string;
    dragType: CursorDragType | string;
    status: CursorStatus;
    position: ICursorPosition;
    dragStartPosition: ICursorPosition;
    dragEndPosition: ICursorPosition;
    dragAtomDelta: ICursorPosition;
    dragStartToCurrentDelta: ICursorPosition;
    dragStartToEndDelta: ICursorPosition;
    view: Window;
    constructor(engine: Engine);
    makeObservable(): void;
    get speed(): number;
    setStatus(status: CursorStatus): void;
    setType(type: CursorType | string): void;
    setDragType(type: CursorDragType | string): void;
    setStyle(style: string): void;
    setPosition(position?: ICursorPosition): void;
    setDragStartPosition(position?: ICursorPosition): void;
    setDragEndPosition(position?: ICursorPosition): void;
}
