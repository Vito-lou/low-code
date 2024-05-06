import { ICustomEvent } from '@lowcode/shared';
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';
export declare class AddWorkspaceEvent extends AbstractWorkspaceEvent implements ICustomEvent {
    type: string;
}
