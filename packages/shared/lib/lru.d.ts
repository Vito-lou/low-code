/**
 * A doubly linked list-based Least Recently Used (LRU) cache. Will keep most
 * recently used items while discarding least recently used items when its limit
 * is reached.
 *
 * Licensed under MIT. Copyright (c) 2010 Rasmus Andersson <http://hunch.se/>
 * See README.md for details.
 *
 * Illustration of the design:
 *
 *       entry             entry             entry             entry
 *       ______            ______            ______            ______
 *      | head |.newer => |      |.newer => |      |.newer => | tail |
 *      |  A   |          |  B   |          |  C   |          |  D   |
 *      |______| <= older.|______| <= older.|______| <= older.|______|
 *
 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
 */
export declare class LRUMap<K, V> {
    size: number;
    limit: number;
    oldest: any;
    newest: any;
    _keymap: Map<K, {
        key: K;
        value: V;
    }>;
    constructor(limit: number, entries?: any);
    private _markEntryAsUsed;
    assign(entries: any): void;
    get(key: K): V;
    set(key: K, value: V): this;
    shift(): any[];
    find(key: K): V;
    has(key: K): boolean;
    delete(key: any): V;
    clear(): void;
    keys(): KeyIterator;
    values(): ValueIterator;
    entries(): void;
    forEach(fun: (value: any, key: any, ctx: object) => void, thisObj: any): void;
    toJSON(): any[];
    toString(): string;
    [Symbol.iterator](): EntryIterator;
}
declare class EntryIterator {
    entry: any;
    constructor(oldestEntry: any);
    [Symbol.iterator](): this;
    next(): {
        done: boolean;
        value: any[];
    };
}
declare class KeyIterator {
    entry: any;
    constructor(oldestEntry: any);
    [Symbol.iterator](): this;
    next(): {
        done: boolean;
        value: any;
    };
}
declare class ValueIterator {
    entry: any;
    constructor(oldestEntry: any);
    [Symbol.iterator](): this;
    next(): {
        done: boolean;
        value: any;
    };
}
export {};
