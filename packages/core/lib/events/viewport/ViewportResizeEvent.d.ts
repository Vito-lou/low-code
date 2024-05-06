import { ICustomEvent } from '@lowcode/shared';
import { AbstractViewportEvent } from './AbstractViewportEvent';
export declare class ViewportResizeEvent extends AbstractViewportEvent implements ICustomEvent {
    type: string;
}
