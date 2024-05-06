import { ICustomEvent } from '@lowcode/shared';
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent';
export declare class KeyDownEvent extends AbstractKeyboardEvent implements ICustomEvent {
    type: string;
}
