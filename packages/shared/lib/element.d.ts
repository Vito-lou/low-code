import { Point } from './coordinate';
export declare const calcElementOuterWidth: (innerWidth: number, style: CSSStyleDeclaration) => number;
/**
 * 拖动一个元素到画布中，如果光标在内联元素旁边，就会在那行出现辅助线，如果是在块级元素旁边，就会在块级那出现辅助线；by loukai
 * @param element
 * @returns
 */
export declare const calcElementLayout: (element: Element) => "vertical" | "horizontal";
export declare const calcElementTranslate: (element: HTMLElement) => Point;
export declare const calcElementRotate: (element: HTMLElement) => number;
export declare const calcElementScale: (element: HTMLElement) => number;
