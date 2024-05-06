import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
export declare class DropNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
    type: string;
}
