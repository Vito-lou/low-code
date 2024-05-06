import { IPoint, Rect, IRect } from '@lowcode/shared';
import { Workspace } from './Workspace';
import { Engine } from './Engine';
import { TreeNode } from './TreeNode';
export interface IViewportProps {
    engine: Engine;
    workspace: Workspace;
    viewportElement: HTMLElement;
    contentWindow: Window;
    nodeIdAttrName: string;
    moveSensitive?: boolean;
    moveInsertionType?: IViewportMoveInsertionType;
}
export interface IViewportData {
    scrollX?: number;
    scrollY?: number;
    width?: number;
    height?: number;
}
export type IViewportMoveInsertionType = 'all' | 'inline' | 'block';
/**
 * 视口模型
 */
export declare class Viewport {
    workspace: Workspace;
    engine: Engine;
    contentWindow: Window;
    viewportElement: HTMLElement;
    dragStartSnapshot: IViewportData;
    scrollX: number;
    scrollY: number;
    width: number;
    height: number;
    mounted: boolean;
    attachRequest: number;
    nodeIdAttrName: string;
    moveSensitive: boolean;
    moveInsertionType: IViewportMoveInsertionType;
    nodeElementsStore: Record<string, HTMLElement[]>;
    constructor(props: IViewportProps);
    get isScrollLeft(): boolean;
    get isScrollTop(): boolean;
    get isScrollRight(): boolean;
    get isScrollBottom(): boolean;
    get viewportRoot(): HTMLElement;
    get isMaster(): boolean;
    get isIframe(): boolean;
    get scrollContainer(): Window | HTMLElement;
    get rect(): DOMRect;
    get innerRect(): Rect;
    get offsetX(): number;
    get offsetY(): number;
    get scale(): number;
    get dragScrollXDelta(): number;
    get dragScrollYDelta(): number;
    cacheElements(): void;
    clearCache(): void;
    getCurrentData(): IViewportData;
    takeDragStartSnapshot(): void;
    digestViewport(): void;
    elementFromPoint(point: IPoint): Element;
    matchViewport(target: HTMLElement | Element | Window | Document | EventTarget): boolean;
    attachEvents(): void;
    detachEvents(): void;
    onMount(element: HTMLElement, contentWindow: Window): void;
    onUnmount(): void;
    isPointInViewport(point: IPoint, sensitive?: boolean): boolean;
    isRectInViewport(rect: IRect): boolean;
    isPointInViewportArea(point: IPoint, sensitive?: boolean): boolean;
    isOffsetPointInViewport(point: IPoint, sensitive?: boolean): boolean;
    isOffsetRectInViewport(rect: IRect): boolean;
    makeObservable(): void;
    findElementById(id: string): HTMLElement;
    findElementsById(id: string): HTMLElement[];
    containsElement(element: HTMLElement | Element | EventTarget): boolean;
    getOffsetPoint(topPoint: IPoint): {
        x: number;
        y: number;
    };
    getElementRect(element: HTMLElement | Element): Rect;
    getElementRectById(id: string): Rect;
    getElementOffsetRect(element: HTMLElement | Element): Rect;
    getElementOffsetRectById(id: string): Rect;
    getValidNodeElement(node: TreeNode): Element;
    getChildrenRect(node: TreeNode): Rect;
    getChildrenOffsetRect(node: TreeNode): Rect;
    getValidNodeRect(node: TreeNode): Rect;
    getValidNodeOffsetRect(node: TreeNode): Rect;
    getValidNodeLayout(node: TreeNode): "vertical" | "horizontal";
}
