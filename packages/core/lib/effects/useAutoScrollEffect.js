"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoScrollEffect = void 0;
const models_1 = require("../models");
const events_1 = require("../events");
const shared_1 = require("@lowcode/shared");
const useAutoScrollEffect = (engine) => {
    let xScroller = null;
    let yScroller = null;
    let xScrollerAnimationStop = null;
    let yScrollerAnimationStop = null;
    const scrolling = (point, viewport) => {
        if (engine.cursor.status === models_1.CursorStatus.Dragging) {
            xScroller = (0, shared_1.calcAutoScrollBasicInfo)(point, 'x', viewport.rect);
            yScroller = (0, shared_1.calcAutoScrollBasicInfo)(point, 'y', viewport.rect);
            if (xScroller) {
                if (xScrollerAnimationStop) {
                    xScrollerAnimationStop();
                }
                xScrollerAnimationStop = (0, shared_1.scrollAnimate)(viewport.scrollContainer, 'x', xScroller.direction, xScroller.speed);
            }
            else {
                if (xScrollerAnimationStop) {
                    xScrollerAnimationStop();
                }
            }
            if (yScroller) {
                if (yScrollerAnimationStop) {
                    yScrollerAnimationStop();
                }
                yScrollerAnimationStop = (0, shared_1.scrollAnimate)(viewport.scrollContainer, 'y', yScroller.direction, yScroller.speed);
            }
            else {
                if (yScrollerAnimationStop) {
                    yScrollerAnimationStop();
                }
            }
        }
    };
    engine.subscribeTo(events_1.DragStartEvent, () => {
        engine.workbench.eachWorkspace((workspace) => {
            workspace.viewport.takeDragStartSnapshot();
        });
    });
    engine.subscribeTo(events_1.DragMoveEvent, (event) => {
        engine.workbench.eachWorkspace((workspace) => {
            const viewport = workspace.viewport;
            const outline = workspace.outline;
            const point = new shared_1.Point(event.data.topClientX, event.data.topClientY);
            if (outline.isPointInViewport(point)) {
                scrolling(point, outline);
            }
            else if (viewport.isPointInViewport(point)) {
                scrolling(point, viewport);
            }
        });
    });
    engine.subscribeTo(events_1.DragStopEvent, () => {
        xScroller = null;
        yScroller = null;
        if (xScrollerAnimationStop) {
            xScrollerAnimationStop();
        }
        if (yScrollerAnimationStop) {
            yScrollerAnimationStop();
        }
    });
};
exports.useAutoScrollEffect = useAutoScrollEffect;
