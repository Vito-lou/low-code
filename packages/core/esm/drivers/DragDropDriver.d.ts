import { EventDriver } from '@lowcode/shared';
import { Engine } from '../models/Engine';
export declare class DragDropDriver extends EventDriver<Engine> {
    mouseDownTimer: any;
    startEvent: MouseEvent;
    onMouseDown: (e: MouseEvent) => boolean;
    onMouseUp: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent | DragEvent) => void;
    onContextMenuWhileDragging: (e: MouseEvent) => void;
    onStartDrag: (e: MouseEvent | DragEvent) => void;
    onDistanceChange: (e: MouseEvent) => void;
    attach(): void;
    detach(): void;
}
