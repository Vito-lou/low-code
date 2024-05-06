import { ICustomEvent } from '@lowcode/shared';
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';
export declare class RemoveWorkspaceEvent extends AbstractWorkspaceEvent implements ICustomEvent {
    type: string;
}
