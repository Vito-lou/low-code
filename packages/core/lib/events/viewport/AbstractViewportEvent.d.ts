import { IEngineContext } from '../../types';
export interface IViewportEventData {
    scrollX: number;
    scrollY: number;
    width: number;
    height: number;
    view: Window;
    innerWidth: number;
    innerHeight: number;
    target: EventTarget;
}
export declare class AbstractViewportEvent {
    data: IViewportEventData;
    context: IEngineContext;
    constructor(data: IViewportEventData);
}
