import { ICustomEvent } from '@lowcode/shared';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class DragStartEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'drag:start';
}
