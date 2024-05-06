import { Subscribable, ISubscriber } from './subscribable';
export type EventOptions = boolean | (AddEventListenerOptions & EventListenerOptions & {
    mode?: 'onlyOne' | 'onlyParent' | 'onlyChild';
});
export type EventContainer = Window | HTMLElement | HTMLDocument;
export type EventDriverContainer = HTMLElement | HTMLDocument;
export interface IEventEffect<T> {
    (engine: T): void;
}
export interface IEventDriver {
    container: EventDriverContainer;
    contentWindow: Window;
    attach(container: EventDriverContainer): void;
    detach(container: EventDriverContainer): void;
    dispatch<T extends ICustomEvent<any> = any>(event: T): void | boolean;
    subscribe<T extends ICustomEvent<any> = any>(subscriber: ISubscriber<T>): void;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
    addEventListener(type: any, listener: any, options: any): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
    removeEventListener(type: any, listener: any, options?: any): void;
    batchAddEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    batchAddEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
    batchAddEventListener(type: any, listener: any, options?: any): void;
    batchRemoveEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    batchRemoveEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
    batchRemoveEventListener(type: any, listener: any, options: any): void;
}
export interface IEventDriverClass<T> {
    new (engine: T, context?: any): IEventDriver;
}
export interface ICustomEvent<EventData = any, EventContext = any> {
    type: string;
    data?: EventData;
    context?: EventContext;
}
export interface CustomEventClass {
    new (...args: any[]): any;
}
export interface IEventProps<T = Event> {
    drivers?: IEventDriverClass<T>[];
    effects?: IEventEffect<T>[];
}
/**
 * 事件驱动器基类
 */
export declare class EventDriver<Engine extends Event = Event, Context = any> implements IEventDriver {
    engine: Engine;
    container: EventDriverContainer;
    contentWindow: Window;
    context: Context;
    constructor(engine: Engine, context?: Context);
    dispatch<T extends ICustomEvent<any> = any>(event: T): boolean;
    subscribe<T extends ICustomEvent<any> = any>(subscriber: ISubscriber<T>): {
        (): void;
        [UNSUBSCRIBE_ID_SYMBOL]: number;
    };
    subscribeTo<T extends CustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>): {
        (): void;
        [UNSUBSCRIBE_ID_SYMBOL]: number;
    };
    subscribeWith<T extends ICustomEvent = ICustomEvent>(type: string | string[], subscriber: ISubscriber<T>): {
        (): void;
        [UNSUBSCRIBE_ID_SYMBOL]: number;
    };
    attach(container: EventDriverContainer): void;
    detach(container: EventDriverContainer): void;
    eventTarget(type: string): Window | EventDriverContainer;
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
    batchAddEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    batchAddEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
    batchRemoveEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventOptions): void;
    batchRemoveEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
}
/**
 * 事件引擎
 */
export declare class Event extends Subscribable<ICustomEvent<any>> {
    private drivers;
    private containers;
    constructor(props?: IEventProps);
    subscribeTo<T extends CustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>): {
        (): void;
        [UNSUBSCRIBE_ID_SYMBOL]: number;
    };
    subscribeWith<T extends ICustomEvent = ICustomEvent>(type: string | string[], subscriber: ISubscriber<T>): {
        (): void;
        [UNSUBSCRIBE_ID_SYMBOL]: number;
    };
    attachEvents(container: EventContainer, contentWindow?: Window, context?: any): any;
    detachEvents(container?: EventContainer): any;
}
