import { ICustomEvent } from '@lowcode/shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';
export declare class HistoryUndoEvent extends AbstractHistoryEvent implements ICustomEvent {
    type: string;
}
