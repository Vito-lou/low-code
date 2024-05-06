import { ICustomEvent } from '@lowcode/shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';
export declare class MouseMoveEvent extends AbstractCursorEvent implements ICustomEvent {
    type: string;
}
