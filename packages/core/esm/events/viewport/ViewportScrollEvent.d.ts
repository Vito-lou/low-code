import { ICustomEvent } from '@lowcode/shared';
import { AbstractViewportEvent } from './AbstractViewportEvent';
export declare class ViewportScrollEvent extends AbstractViewportEvent implements ICustomEvent {
    type: string;
}
