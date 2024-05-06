import { ICustomEvent } from '@lowcode/shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';
export declare class DragStartEvent extends AbstractCursorEvent implements ICustomEvent {
    type: string;
}
