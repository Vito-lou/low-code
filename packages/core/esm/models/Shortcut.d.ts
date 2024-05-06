import { KeyCode } from '@lowcode/shared';
import { IEngineContext } from '../types';
export { KeyCode };
export interface IShortcutProps {
    codes?: KeyCode[] | KeyCode[][];
    matcher?: (codes: KeyCode[]) => boolean;
    handler?: (context: IEngineContext) => void;
}
export declare class Shortcut {
    codes: KeyCode[][];
    handler: (context: IEngineContext) => void;
    matcher: (codes: KeyCode[]) => boolean;
    constructor(props: IShortcutProps);
    parseCodes(codes: Array<KeyCode | KeyCode[]>): KeyCode[][];
    preventCodes(codes: KeyCode[]): boolean;
    matched(matched: boolean, context: IEngineContext): boolean;
    match(codes: KeyCode[], context: IEngineContext): boolean;
    static matchCode: (code1: KeyCode, code2: KeyCode) => boolean;
    static sortCodes: (codes: KeyCode[]) => KeyCode[];
}
