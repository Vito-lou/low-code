import { Workspace } from './Workspace';
import { Engine } from './Engine';
import { TreeNode, ITreeNode } from './TreeNode';
import { Selection } from './Selection';
import { Hover } from './Hover';
import { TransformHelper } from './TransformHelper';
import { MoveHelper } from './MoveHelper';
import { ICustomEvent } from '@lowcode/shared';
export interface IOperation {
    tree?: ITreeNode;
    selected?: string[];
}
export declare class Operation {
    workspace: Workspace;
    engine: Engine;
    tree: TreeNode;
    selection: Selection;
    hover: Hover;
    transformHelper: TransformHelper;
    moveHelper: MoveHelper;
    requests: {
        snapshot: any;
    };
    constructor(workspace: Workspace);
    dispatch(event: ICustomEvent, callback?: () => void): void;
    snapshot(type?: string): void;
    from(operation?: IOperation): void;
    serialize(): IOperation;
}
