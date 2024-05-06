import { AbstractViewportEvent } from './AbstractViewportEvent';
export class ViewportScrollEvent extends AbstractViewportEvent {
    constructor() {
        super(...arguments);
        this.type = 'viewport:scroll';
    }
}
