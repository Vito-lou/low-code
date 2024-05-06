import { Engine } from './Engine';
import { Viewport } from './Viewport';
import { Operation, IOperation } from './Operation';
import { History } from './History';
import { ICustomEvent, EventContainer } from '@lowcode/shared';
import { IEngineContext } from '../types';
export interface IViewportMatcher {
    contentWindow?: Window;
    viewportElement?: HTMLElement;
}
export interface IWorkspace {
    id?: string;
    title?: string;
    description?: string;
    operation: IOperation;
}
export interface IWorkspaceProps {
    id?: string;
    title?: string;
    description?: string;
    contentWindow?: Window;
    viewportElement?: HTMLElement;
}
export declare class Workspace {
    id: string;
    title: string;
    description: string;
    engine: Engine;
    viewport: Viewport;
    outline: Viewport;
    operation: Operation;
    history: History<Workspace>;
    props: IWorkspaceProps;
    constructor(engine: Engine, props: IWorkspaceProps);
    getEventContext(): IEngineContext;
    attachEvents(container: EventContainer, contentWindow: Window): void;
    detachEvents(container: EventContainer): void;
    dispatch(event: ICustomEvent): boolean;
    serialize(): IWorkspace;
    from(workspace?: IWorkspace): void;
}
