import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class HoverNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
