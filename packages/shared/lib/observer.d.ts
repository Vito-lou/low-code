export declare class LayoutObserver {
    private resizeObserver;
    private performanceObserver;
    private mutationObserver;
    private connected;
    constructor(observer?: () => void);
    observe: (target: HTMLElement | Element) => void;
    disconnect: () => void;
}
