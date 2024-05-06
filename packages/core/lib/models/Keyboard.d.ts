import { KeyCode } from '@lowcode/shared';
import { Engine } from './Engine';
import { Shortcut } from './Shortcut';
import { AbstractKeyboardEvent } from '../events/keyboard/AbstractKeyboardEvent';
import { IEngineContext } from '../types';
export interface IKeyboard {
    engine: Engine;
}
export declare class Keyboard {
    engine: Engine;
    shortcuts: Shortcut[];
    sequence: KeyCode[];
    keyDown: KeyCode;
    modifiers: {};
    requestTimer: any;
    constructor(engine?: Engine);
    matchCodes(context: IEngineContext): boolean;
    preventCodes(): boolean;
    includes(key: KeyCode): boolean;
    excludes(key: KeyCode): void;
    addKeyCode(key: KeyCode): void;
    removeKeyCode(key: KeyCode): void;
    isModifier(code: KeyCode): boolean;
    handleModifiers(event: AbstractKeyboardEvent): void;
    handleKeyboard(event: AbstractKeyboardEvent, context: IEngineContext): void;
    isKeyDown(code: KeyCode): boolean;
    requestClean(duration?: number): void;
    makeObservable(): void;
}
