import { IPoint } from './coordinate';
export type ScrollDirection = 'begin' | 'end';
export interface IAutoScrollBasicInfo {
    direction: ScrollDirection;
    speedFactor: number;
    speed: number;
}
export declare const calcAutoScrollBasicInfo: (point: IPoint, axis: 'x' | 'y', viewport: DOMRect, maxSpeed?: number) => IAutoScrollBasicInfo | null;
export declare const updateScrollValue: (element: HTMLElement | Window, axis: 'x' | 'y', value: number, callback?: (scrollValue: number) => void) => void;
export declare const scrollAnimate: (element: HTMLElement | Window, axis: 'x' | 'y', direction: 'begin' | 'end', speed: number, callback?: (scrollValue: number) => void) => () => void;
