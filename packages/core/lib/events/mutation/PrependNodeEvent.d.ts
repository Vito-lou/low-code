import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class PrependNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
