import { IEngineProps } from '../types';
import { ITreeNode, TreeNode } from './TreeNode';
import { Workbench } from './Workbench';
import { Cursor } from './Cursor';
import { Keyboard } from './Keyboard';
import { Screen } from './Screen';
import { Event } from '@lowcode/shared';
/**
 * 设计器引擎
 */
export declare class Engine extends Event {
    id: string;
    props: IEngineProps<Engine>;
    cursor: Cursor;
    workbench: Workbench;
    keyboard: Keyboard;
    screen: Screen;
    constructor(props: IEngineProps<Engine>);
    init(): void;
    setCurrentTree(tree?: ITreeNode): void;
    getCurrentTree(): TreeNode;
    getAllSelectedNodes(): TreeNode[];
    findNodeById(id: string): TreeNode;
    findMovingNodes(): TreeNode[];
    createNode(node: ITreeNode, parent?: TreeNode): TreeNode;
    mount(): void;
    unmount(): void;
    static defaultProps: IEngineProps<Engine>;
}
