import 'requestidlecallback';
/**
 * 他说之前的没有类型提示，所以自己写了一个，为了代码好看一点 loukai
 */
export interface IIdleDeadline {
    didTimeout: boolean;
    timeRemaining: () => DOMHighResTimeStamp;
}
export interface IdleCallbackOptions {
    timeout?: number;
}
export declare const requestIdle: (callback: (params: IIdleDeadline) => void, options?: IdleCallbackOptions) => number;
export declare const cancelIdle: (id: number) => void;
