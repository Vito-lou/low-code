import { ICustomEvent } from '@lowcode/shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';
export declare class HistoryPushEvent extends AbstractHistoryEvent implements ICustomEvent {
    type: string;
}
