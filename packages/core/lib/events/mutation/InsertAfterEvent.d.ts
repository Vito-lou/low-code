import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class InsertAfterEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
