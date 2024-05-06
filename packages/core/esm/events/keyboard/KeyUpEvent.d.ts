import { ICustomEvent } from '@lowcode/shared';
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent';
export declare class KeyUpEvent extends AbstractKeyboardEvent implements ICustomEvent {
    type: string;
}
