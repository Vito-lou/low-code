import { EventDriver } from '@lowcode/shared';
import { Engine } from '../models/Engine';
import { ResizeObserver } from '@juggle/resize-observer';
export declare class ViewportResizeDriver extends EventDriver<Engine> {
    request: any;
    resizeObserver: ResizeObserver;
    onResize: (e: any) => void;
    attach(): void;
    detach(): void;
}
