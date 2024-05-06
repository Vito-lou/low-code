/**
 * 用来实现当画布区出现滚动条时，拖拽一个组件网上往下的滚动效果
 * @param speed
 * @param callback
 * @returns
 */
export declare const createUniformSpeedAnimation: (speed: number, callback: (delta: number) => void) => () => void;
export declare const calcSpeedFactor: (delta?: number, threshold?: number) => number;
