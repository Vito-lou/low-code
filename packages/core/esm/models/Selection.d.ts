import { Operation } from './Operation';
import { SelectNodeEvent } from '../events';
import { TreeNode } from './TreeNode';
export interface ISelection {
    selected?: string[];
    operation?: Operation;
}
export declare class Selection {
    operation: Operation;
    selected: string[];
    indexes: Record<string, boolean>;
    constructor(props?: ISelection);
    makeObservable(): void;
    trigger(type?: typeof SelectNodeEvent): void;
    select(id: string | TreeNode): void;
    safeSelect(id: string | TreeNode): void;
    mapIds(ids: any): any[];
    batchSelect(ids: string[] | TreeNode[]): void;
    batchSafeSelect(ids: string[] | TreeNode[]): void;
    get selectedNodes(): TreeNode[];
    get first(): string;
    get last(): string;
    get length(): number;
    add(...ids: string[] | TreeNode[]): void;
    crossAddTo(node: TreeNode): void;
    remove(...ids: string[] | TreeNode[]): void;
    has(...ids: string[] | TreeNode[]): any;
    clear(): void;
}
