import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class UnSelectNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
