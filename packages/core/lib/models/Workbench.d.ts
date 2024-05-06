import { Engine } from './Engine';
import { Workspace, IWorkspaceProps } from './Workspace';
import { IEngineContext, WorkbenchTypes } from '../types';
export declare class Workbench {
    workspaces: Workspace[];
    currentWorkspace: Workspace;
    activeWorkspace: Workspace;
    engine: Engine;
    type: WorkbenchTypes;
    constructor(engine: Engine);
    makeObservable(): void;
    getEventContext(): IEngineContext;
    switchWorkspace(id: string): Workspace;
    setActiveWorkspace(workspace: Workspace): Workspace;
    setWorkbenchType(type: WorkbenchTypes): void;
    addWorkspace(props: IWorkspaceProps): Workspace;
    removeWorkspace(id: string): void;
    ensureWorkspace(props?: IWorkspaceProps): Workspace;
    findWorkspaceById(id: string): Workspace;
    findWorkspaceIndexById(id: string): number;
    mapWorkspace<T>(callbackFn: (value: Workspace, index: number) => T): T[];
    eachWorkspace<T>(callbackFn: (value: Workspace, index: number) => T): void;
}
