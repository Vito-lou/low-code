export interface IPoint {
    x: number;
    y: number;
}
export interface ISize {
    width: number;
    height: number;
}
export interface ILineSegment {
    start: IPoint;
    end: IPoint;
}
export interface IRectEdgeLines {
    v: ILineSegment[];
    h: ILineSegment[];
}
export declare function isRect(rect: any): rect is IRect;
export declare function isPoint(val: any): val is IPoint;
export declare function isLineSegment(val: any): val is ILineSegment;
export declare class Point implements IPoint {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class Rect implements IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
}
export declare class LineSegment {
    start: IPoint;
    end: IPoint;
    constructor(start: IPoint, end: IPoint);
}
export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare enum RectQuadrant {
    Inner1 = "I1",//内部第一象限
    Inner2 = "I2",//内部第二象限
    Inner3 = "I3",//内部第三象限
    Inner4 = "I4",//内部第四象限
    Outer1 = "O1",//外部第五象限
    Outer2 = "O2",//外部第六象限
    Outer3 = "O3",//外部第七象限
    Outer4 = "O4"
}
export interface IPointToRectRelative {
    quadrant: RectQuadrant;
    distance: number;
}
export declare function isPointInRect(point: IPoint, rect: IRect, sensitive?: boolean): boolean;
export declare function isEqualRect(target: IRect, source: IRect): boolean;
export declare function getRectPoints(source: IRect): Point[];
export declare function isRectInRect(target: IRect, source: IRect): boolean;
export declare function isCrossRectInRect(target: IRect, source: IRect): boolean;
/**
 * 计算点在矩形的哪个象限
 * @param point
 * @param rect
 */
export declare function calcQuadrantOfPointToRect(point: IPoint, rect: IRect): RectQuadrant;
export declare function calcDistanceOfPointToRect(point: IPoint, rect: IRect): number;
export declare function calcDistancePointToEdge(point: IPoint, rect: IRect): number;
export declare function isNearAfter(point: IPoint, rect: IRect, inline?: boolean): boolean;
/**
 * 计算点鱼矩形的相对位置信息
 * @param point
 * @param rect
 */
export declare function calcRelativeOfPointToRect(point: IPoint, rect: IRect): IPointToRectRelative;
export declare function calcBoundingRect(rects: IRect[]): Rect;
export declare function calcRectByStartEndPoint(startPoint: IPoint, endPoint: IPoint, scrollX?: number, scrollY?: number): Rect;
export declare function calcEdgeLinesOfRect(rect: IRect): IRectEdgeLines;
export declare function calcRectOfAxisLineSegment(line: ILineSegment): Rect;
export declare function calcSpaceBlockOfRect(target: IRect, source: IRect, type?: string): {
    type: string;
    distance: number;
    rect: Rect;
};
export declare function calcExtendsLineSegmentOfRect(targetRect: Rect, referRect: Rect): {
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
};
export declare function calcOffsetOfSnapLineSegmentToEdge(line: ILineSegment, current: IRect): {
    x: number;
    y: number;
};
export declare function calcDistanceOfSnapLineToEdges(line: ILineSegment, edges: IRectEdgeLines): number;
export declare function calcCombineSnapLineSegment(target: ILineSegment, source: ILineSegment): ILineSegment;
export declare function calcClosestEdges(line: ILineSegment, edges: IRectEdgeLines): [number, ILineSegment];
