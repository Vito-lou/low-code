import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class InsertBeforeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
