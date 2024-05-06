import { Operation } from './Operation';
import { TreeNode } from './TreeNode';
export interface IHoverProps {
    operation: Operation;
}
export declare class Hover {
    node: TreeNode;
    operation: Operation;
    constructor(props?: IHoverProps);
    setHover(node?: TreeNode): void;
    clear(): void;
    trigger(): void;
    makeObservable(): void;
}
