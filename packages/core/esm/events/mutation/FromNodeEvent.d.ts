import { ICustomEvent } from '@lowcode/shared';
import { ITreeNode, TreeNode } from '../../models';
import { IEngineContext } from '../../types';
export interface IFromNodeEventData {
    source: ITreeNode;
    target: TreeNode;
}
export declare class FromNodeEvent implements ICustomEvent {
    type: string;
    data: IFromNodeEventData;
    context: IEngineContext;
    constructor(data: IFromNodeEventData);
}
