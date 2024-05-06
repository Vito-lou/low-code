import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class AppendNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
