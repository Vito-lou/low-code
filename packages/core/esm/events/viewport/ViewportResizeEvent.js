import { AbstractViewportEvent } from './AbstractViewportEvent';
export class ViewportResizeEvent extends AbstractViewportEvent {
    constructor() {
        super(...arguments);
        this.type = 'viewport:resize';
    }
}
