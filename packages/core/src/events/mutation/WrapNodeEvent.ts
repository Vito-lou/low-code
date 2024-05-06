import { ICustomEvent } from '@lowcode/shared';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class WrapNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'wrap:node';
}
