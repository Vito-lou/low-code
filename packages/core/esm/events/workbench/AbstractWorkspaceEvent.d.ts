import { Workspace } from '../../models';
import { IEngineContext } from '../../types';
export declare class AbstractWorkspaceEvent {
    data: Workspace;
    context: IEngineContext;
    constructor(data: Workspace);
}
