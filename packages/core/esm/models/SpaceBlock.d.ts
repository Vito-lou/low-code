import { Rect } from '@lowcode/shared';
import { SnapLine } from './SnapLine';
import { TransformHelper } from './TransformHelper';
import { TreeNode } from './TreeNode';
export type ISpaceBlockType = 'top' | 'right' | 'bottom' | 'left' | (string & {});
export interface ISpaceBlock {
    id?: string;
    refer?: TreeNode;
    rect?: Rect;
    distance?: number;
    type?: ISpaceBlockType;
}
export type AroundSpaceBlock = Record<ISpaceBlockType, SpaceBlock>;
export declare class SpaceBlock {
    _id: string;
    distance: number;
    refer: TreeNode;
    helper: TransformHelper;
    rect: Rect;
    type: ISpaceBlockType;
    constructor(helper: TransformHelper, box: ISpaceBlock);
    get referRect(): Rect;
    get id(): string;
    get next(): SpaceBlock;
    get extendsLine(): {
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
    };
    get needExtendsLine(): boolean;
    get crossReferRect(): Rect;
    get crossDragNodesRect(): Rect;
    get isometrics(): SpaceBlock[];
    get snapLine(): SnapLine;
}
