import { TreeNode } from '../../models';
import { IEngineContext } from '../../types';
export interface IMutationNodeEventData {
    source: TreeNode | TreeNode[];
    target: TreeNode | TreeNode[];
    originSourceParents?: TreeNode | TreeNode[];
    extra?: any;
}
export declare class AbstractMutationNodeEvent {
    data: IMutationNodeEventData;
    context: IEngineContext;
    constructor(data: IMutationNodeEventData);
}
