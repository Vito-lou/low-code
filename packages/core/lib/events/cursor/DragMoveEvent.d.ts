import { ICustomEvent } from '@lowcode/shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';
export declare class DragMoveEvent extends AbstractCursorEvent implements ICustomEvent {
    type: string;
}
