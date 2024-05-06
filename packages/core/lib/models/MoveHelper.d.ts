import { Operation } from './Operation';
import { TreeNode } from './TreeNode';
import { IPoint, Rect } from '@lowcode/shared';
import { Viewport } from './Viewport';
export declare enum ClosestPosition {
    Before = "BEFORE",
    ForbidBefore = "FORBID_BEFORE",
    After = "After",
    ForbidAfter = "FORBID_AFTER",
    Upper = "UPPER",
    ForbidUpper = "FORBID_UPPER",
    Under = "UNDER",
    ForbidUnder = "FORBID_UNDER",
    Inner = "INNER",
    ForbidInner = "FORBID_INNER",
    InnerAfter = "INNER_AFTER",
    ForbidInnerAfter = "FORBID_INNER_AFTER",
    InnerBefore = "INNER_BEFORE",
    ForbidInnerBefore = "FORBID_INNER_BEFORE",
    Forbid = "FORBID"
}
export interface IMoveHelperProps {
    operation: Operation;
}
export interface IMoveHelperDragStartProps {
    dragNodes: TreeNode[];
}
export interface IMoveHelperDragDropProps {
    dropNode: TreeNode;
}
export interface IMoveHelperDragMoveProps {
    touchNode: TreeNode;
    point: IPoint;
}
export declare class MoveHelper {
    operation: Operation;
    rootNode: TreeNode;
    dragNodes: TreeNode[];
    touchNode: TreeNode;
    closestNode: TreeNode;
    activeViewport: Viewport;
    viewportClosestRect: Rect;
    outlineClosestRect: Rect;
    viewportClosestOffsetRect: Rect;
    outlineClosestOffsetRect: Rect;
    viewportClosestDirection: ClosestPosition;
    outlineClosestDirection: ClosestPosition;
    dragging: boolean;
    constructor(props: IMoveHelperProps);
    get cursor(): import("./Cursor").Cursor;
    get viewport(): Viewport;
    get outline(): Viewport;
    get hasDragNodes(): boolean;
    get closestDirection(): ClosestPosition;
    getClosestLayout(viewport: Viewport): "vertical" | "horizontal";
    calcClosestPosition(point: IPoint, viewport: Viewport): ClosestPosition;
    calcClosestNode(point: IPoint, viewport: Viewport): TreeNode;
    calcClosestRect(viewport: Viewport, closestDirection: ClosestPosition): Rect;
    calcClosestOffsetRect(viewport: Viewport, closestDirection: ClosestPosition): Rect;
    dragStart(props: IMoveHelperDragStartProps): void;
    dragMove(props: IMoveHelperDragMoveProps): void;
    dragDrop(props: IMoveHelperDragDropProps): void;
    dragEnd(): void;
    trigger(event: any): void;
    makeObservable(): void;
}
