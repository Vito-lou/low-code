import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class SelectNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
