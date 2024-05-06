import { IEngineContext } from '../../types';
export interface ICursorEventOriginData {
    clientX: number;
    clientY: number;
    pageX: number;
    pageY: number;
    target: EventTarget;
    view: Window;
}
export interface ICursorEventData extends ICursorEventOriginData {
    topClientX?: number;
    topClientY?: number;
    topPageX?: number;
    topPageY?: number;
}
export declare class AbstractCursorEvent {
    data: ICursorEventData;
    context: IEngineContext;
    constructor(data: ICursorEventOriginData);
    transformCoordinates(): void;
}
