import { ILineSegment, IPoint, Rect } from '@lowcode/shared';
import { TreeNode } from './TreeNode';
import { TransformHelper } from './TransformHelper';
export type ISnapLineType = 'ruler' | 'space-block' | 'normal';
export type ISnapLine = ILineSegment & {
    type?: ISnapLineType;
    distance?: number;
    id?: string;
    refer?: TreeNode;
};
export declare class SnapLine {
    _id: string;
    type: ISnapLineType;
    distance: number;
    refer: TreeNode;
    start: IPoint;
    end: IPoint;
    helper: TransformHelper;
    constructor(helper: TransformHelper, line: ISnapLine);
    get id(): string;
    get direction(): "v" | "h";
    get closest(): boolean;
    get rect(): Rect;
    translate(node: TreeNode, translate: IPoint): void;
    resize(node: TreeNode, rect: Rect): void;
    snapEdge(rect: Rect): "ht" | "hc" | "hb" | "vl" | "vc" | "vr";
}
