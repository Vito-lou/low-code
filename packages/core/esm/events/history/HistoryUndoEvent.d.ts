import { ICustomEvent } from '@lowcode/shared';
import { AbstractHistoryEvent } from './AbstractHistoryEvent';
export declare class HistoryRedoEvent extends AbstractHistoryEvent implements ICustomEvent {
    type: string;
}
