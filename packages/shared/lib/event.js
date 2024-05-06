"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.EventDriver = void 0;
const types_1 = require("./types");
const subscribable_1 = require("./subscribable");
const globalThisPolyfill_1 = require("./globalThisPolyfill");
const ATTACHED_SYMBOL = Symbol('ATTACHED_SYMBOL');
const EVENTS_SYMBOL = Symbol('__EVENTS_SYMBOL__');
const EVENTS_ONCE_SYMBOL = Symbol('EVENTS_ONCE_SYMBOL');
const EVENTS_BATCH_SYMBOL = Symbol('EVENTS_BATCH_SYMBOL');
const DRIVER_INSTANCES_SYMBOL = Symbol('DRIVER_INSTANCES_SYMBOL');
const isOnlyMode = (mode) => mode === 'onlyOne' || mode === 'onlyChild' || mode === 'onlyParent';
/**
 * 事件驱动器基类
 */
class EventDriver {
    constructor(engine, context) {
        this.container = document;
        this.contentWindow = globalThisPolyfill_1.globalThisPolyfill;
        this.engine = engine;
        this.context = context;
    }
    dispatch(event) {
        return this.engine.dispatch(event, this.context);
    }
    subscribe(subscriber) {
        return this.engine.subscribe(subscriber);
    }
    subscribeTo(type, subscriber) {
        return this.engine.subscribeTo(type, subscriber);
    }
    subscribeWith(type, subscriber) {
        return this.engine.subscribeWith(type, subscriber);
    }
    attach(container) {
        console.error('attach must implement.');
    }
    detach(container) {
        console.error('attach must implement.');
    }
    eventTarget(type) {
        var _a;
        if (type === 'resize' || type === 'scroll') {
            if (this.container === ((_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.document)) {
                return this.contentWindow;
            }
        }
        return this.container;
    }
    addEventListener(type, listener, options) {
        var _a, _b, _c, _d;
        const target = this.eventTarget(type);
        if (isOnlyMode(options === null || options === void 0 ? void 0 : options.mode)) {
            target[EVENTS_ONCE_SYMBOL] = target[EVENTS_ONCE_SYMBOL] || {};
            const constructor = this['constructor'];
            constructor[EVENTS_ONCE_SYMBOL] = constructor[EVENTS_ONCE_SYMBOL] || {};
            const handler = target[EVENTS_ONCE_SYMBOL][type];
            const container = constructor[EVENTS_ONCE_SYMBOL][type];
            if (!handler) {
                if (container) {
                    if (options.mode === 'onlyChild') {
                        if (container.contains(target)) {
                            container.removeEventListener(type, container[EVENTS_ONCE_SYMBOL][type], options);
                            delete container[EVENTS_ONCE_SYMBOL][type];
                        }
                    }
                    else if (options.mode === 'onlyParent') {
                        if (container.contains(target))
                            return;
                    }
                }
                target.addEventListener(type, listener, options);
                target[EVENTS_ONCE_SYMBOL][type] = listener;
                constructor[EVENTS_ONCE_SYMBOL][type] = target;
            }
        }
        else {
            target[EVENTS_SYMBOL] = target[EVENTS_SYMBOL] || {};
            target[EVENTS_SYMBOL][type] = target[EVENTS_SYMBOL][type] || new Map();
            if (!((_b = (_a = target[EVENTS_SYMBOL][type]) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(_a, listener))) {
                target.addEventListener(type, listener, options);
                (_d = (_c = target[EVENTS_SYMBOL][type]) === null || _c === void 0 ? void 0 : _c.set) === null || _d === void 0 ? void 0 : _d.call(_c, listener, true);
            }
        }
    }
    removeEventListener(type, listener, options) {
        var _a, _b;
        const target = this.eventTarget(type);
        if (isOnlyMode(options === null || options === void 0 ? void 0 : options.mode)) {
            const constructor = this['constructor'];
            constructor[EVENTS_ONCE_SYMBOL] = constructor[EVENTS_ONCE_SYMBOL] || {};
            target[EVENTS_ONCE_SYMBOL] = target[EVENTS_ONCE_SYMBOL] || {};
            delete constructor[EVENTS_ONCE_SYMBOL][type];
            delete target[EVENTS_ONCE_SYMBOL][type];
            target.removeEventListener(type, listener, options);
        }
        else {
            target[EVENTS_SYMBOL] = target[EVENTS_SYMBOL] || {};
            target[EVENTS_SYMBOL][type] = target[EVENTS_SYMBOL][type] || new Map();
            (_b = (_a = target[EVENTS_SYMBOL][type]) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, listener);
            target.removeEventListener(type, listener, options);
        }
    }
    batchAddEventListener(type, listener, options) {
        this.engine[DRIVER_INSTANCES_SYMBOL] =
            this.engine[DRIVER_INSTANCES_SYMBOL] || [];
        if (!this.engine[DRIVER_INSTANCES_SYMBOL].includes(this)) {
            this.engine[DRIVER_INSTANCES_SYMBOL].push(this);
        }
        this.engine[DRIVER_INSTANCES_SYMBOL].forEach((driver) => {
            const target = driver.eventTarget(type);
            target[EVENTS_BATCH_SYMBOL] = target[EVENTS_BATCH_SYMBOL] || {};
            if (!target[EVENTS_BATCH_SYMBOL][type]) {
                target.addEventListener(type, listener, options);
                target[EVENTS_BATCH_SYMBOL][type] = listener;
            }
        });
    }
    batchRemoveEventListener(type, listener, options) {
        this.engine[DRIVER_INSTANCES_SYMBOL] =
            this.engine[DRIVER_INSTANCES_SYMBOL] || [];
        this.engine[DRIVER_INSTANCES_SYMBOL].forEach((driver) => {
            const target = driver.eventTarget(type);
            target[EVENTS_BATCH_SYMBOL] = target[EVENTS_BATCH_SYMBOL] || {};
            target.removeEventListener(type, listener, options);
            delete target[EVENTS_BATCH_SYMBOL][type];
        });
    }
}
exports.EventDriver = EventDriver;
/**
 * 事件引擎
 */
class Event extends subscribable_1.Subscribable {
    constructor(props) {
        super();
        this.drivers = [];
        this.containers = [];
        if ((0, types_1.isArr)(props === null || props === void 0 ? void 0 : props.effects)) {
            props.effects.forEach((plugin) => {
                plugin(this);
            });
        }
        if ((0, types_1.isArr)(props === null || props === void 0 ? void 0 : props.drivers)) {
            this.drivers = props.drivers;
        }
    }
    subscribeTo(type, subscriber) {
        return this.subscribe((event) => {
            if (type && event instanceof type) {
                return subscriber(event);
            }
        });
    }
    subscribeWith(type, subscriber) {
        return this.subscribe((event) => {
            if ((0, types_1.isArr)(type)) {
                if (type.includes(event === null || event === void 0 ? void 0 : event.type)) {
                    return subscriber(event);
                }
            }
            else {
                if (type && (event === null || event === void 0 ? void 0 : event.type) === type) {
                    return subscriber(event);
                }
            }
        });
    }
    attachEvents(container, contentWindow = globalThisPolyfill_1.globalThisPolyfill, context) {
        if (!container)
            return;
        if ((0, types_1.isWindow)(container)) {
            return this.attachEvents(container.document, container, context);
        }
        if (container[ATTACHED_SYMBOL])
            return;
        container[ATTACHED_SYMBOL] = this.drivers.map((EventDriver) => {
            const driver = new EventDriver(this, context);
            driver.contentWindow = contentWindow;
            driver.container = container;
            driver.attach(container);
            return driver;
        });
        if (!this.containers.includes(container)) {
            this.containers.push(container);
        }
    }
    detachEvents(container) {
        if (!container) {
            this.containers.forEach((container) => {
                this.detachEvents(container);
            });
            return;
        }
        if ((0, types_1.isWindow)(container)) {
            return this.detachEvents(container.document);
        }
        if (!container[ATTACHED_SYMBOL])
            return;
        container[ATTACHED_SYMBOL].forEach((driver) => {
            driver.detach(container);
        });
        this[DRIVER_INSTANCES_SYMBOL] = this[DRIVER_INSTANCES_SYMBOL] || [];
        this[DRIVER_INSTANCES_SYMBOL] = this[DRIVER_INSTANCES_SYMBOL].reduce((drivers, driver) => {
            if (driver.container === container) {
                driver.detach(container);
                return drivers;
            }
            return drivers.concat(driver);
        }, []);
        this.containers = this.containers.filter((item) => item !== container);
        delete container[ATTACHED_SYMBOL];
        delete container[EVENTS_SYMBOL];
        delete container[EVENTS_ONCE_SYMBOL];
        delete container[EVENTS_BATCH_SYMBOL];
    }
}
exports.Event = Event;
