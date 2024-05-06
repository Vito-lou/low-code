import { KeyCode } from '@lowcode/shared';
import { IEngineContext } from '../../types';
export declare class AbstractKeyboardEvent {
    data: KeyCode;
    context: IEngineContext;
    originEvent: KeyboardEvent;
    constructor(e: KeyboardEvent);
    get eventType(): string;
    get ctrlKey(): boolean;
    get shiftKey(): boolean;
    get metaKey(): boolean;
    get altkey(): boolean;
    preventDefault(): void;
    stopPropagation(): void;
}
