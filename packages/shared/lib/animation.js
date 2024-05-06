"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSpeedFactor = exports.createUniformSpeedAnimation = void 0;
/**
 * 用来实现当画布区出现滚动条时，拖拽一个组件网上往下的滚动效果
 * @param speed
 * @param callback
 * @returns
 */
const createUniformSpeedAnimation = (speed = 10, callback) => {
    let request = null;
    let startTime = null;
    const start = () => {
        if (request)
            return;
        request = requestAnimationFrame((timestamp) => {
            if (startTime === null) {
                startTime = timestamp;
            }
            const deltaTime = timestamp - startTime;
            const delta = (deltaTime / 1000) * speed;
            callback(delta);
            request = null;
            start();
        });
    };
    start();
    return () => {
        if (request) {
            cancelAnimationFrame(request);
            request = null;
        }
        startTime = null;
    };
};
exports.createUniformSpeedAnimation = createUniformSpeedAnimation;
//越接近阈值，速度越小，越远离阈值，速度越大
const calcSpeedFactor = (delta = 0, threshold = Infinity) => {
    if (threshold >= delta) {
        return (threshold - delta) / threshold;
    }
    return 0;
};
exports.calcSpeedFactor = calcSpeedFactor;
