import { ICustomEvent } from '@lowcode/shared';
import { AbstractViewportEvent } from './AbstractViewportEvent';

export class ViewportResizeEvent
  extends AbstractViewportEvent
  implements ICustomEvent
{
  type = 'viewport:resize';
}
