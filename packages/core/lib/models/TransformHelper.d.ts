import { Point, IPoint, ISize, IRect, Rect } from '@lowcode/shared';
import { SpaceBlock, AroundSpaceBlock } from './SpaceBlock';
import { Operation } from './Operation';
import { TreeNode } from './TreeNode';
import { SnapLine, ISnapLine } from './SnapLine';
export interface ITransformHelperProps {
    operation: Operation;
}
export type TransformHelperType = 'translate' | 'resize' | 'rotate' | 'scale' | 'round';
export type ResizeDirection = 'left-top' | 'left-center' | 'left-bottom' | 'center-top' | 'center-bottom' | 'right-top' | 'right-bottom' | 'right-center' | (string & {});
export interface ITransformHelperDragStartProps {
    type: TransformHelperType;
    direction?: ResizeDirection;
    dragNodes: TreeNode[];
}
export declare class TransformHelper {
    operation: Operation;
    type: TransformHelperType;
    direction: ResizeDirection;
    dragNodes: TreeNode[];
    rulerSnapLines: SnapLine[];
    aroundSnapLines: SnapLine[];
    aroundSpaceBlocks: AroundSpaceBlock;
    viewportRectsStore: Record<string, Rect>;
    dragStartTranslateStore: Record<string, IPoint>;
    dragStartSizeStore: Record<string, ISize>;
    draggingNodesRect: Rect;
    cacheDragNodesReact: Rect;
    dragStartNodesRect: IRect;
    snapping: boolean;
    dragging: boolean;
    snapped: boolean;
    constructor(props: ITransformHelperProps);
    get tree(): TreeNode;
    get cursor(): import("./Cursor").Cursor;
    get viewport(): import("./Viewport").Viewport;
    get deltaX(): number;
    get deltaY(): number;
    get cursorPosition(): {
        x: number;
        y: number;
    };
    get cursorDragNodesRect(): Rect;
    get cursorDragNodesEdgeLines(): import("@lowcode/shared").IRectEdgeLines;
    get dragNodesRect(): Rect;
    get dragNodesEdgeLines(): import("@lowcode/shared").IRectEdgeLines;
    get cursorOffset(): Point;
    get dragStartCursor(): {
        x: number;
        y: number;
    };
    get dragStartCursorOffset(): Point;
    get closestSnapLines(): SnapLine[];
    get closestSpaceBlocks(): SpaceBlock[];
    get thresholdSnapLines(): SnapLine[];
    get thresholdSpaceBlocks(): SpaceBlock[];
    get measurerSpaceBlocks(): SpaceBlock[];
    calcBaseTranslate(node: TreeNode): {
        x: number;
        y: number;
    };
    calcBaseResize(node: TreeNode): Rect;
    calcDragStartStore(nodes?: TreeNode[]): void;
    calcRulerSnapLines(dragNodesRect: IRect): SnapLine[];
    calcAroundSnapLines(dragNodesRect: Rect): SnapLine[];
    calcAroundSpaceBlocks(dragNodesRect: IRect): AroundSpaceBlock;
    calcViewportNodes(): void;
    getNodeRect(node: TreeNode): Rect;
    eachViewportNodes(visitor: (node: TreeNode, rect: Rect) => void): void;
    translate(node: TreeNode, handler: (translate: IPoint) => void): void;
    resize(node: TreeNode, handler: (resize: IRect) => void): void;
    findRulerSnapLine(id: string): SnapLine;
    addRulerSnapLine(line: ISnapLine): void;
    removeRulerSnapLine(id: string): void;
    dragStart(props: ITransformHelperDragStartProps): void;
    dragMove(): void;
    dragEnd(): void;
    makeObservable(): void;
    static threshold: number;
}
