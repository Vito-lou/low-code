"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewportEffect = void 0;
const events_1 = require("../events");
const useViewportEffect = (engine) => {
    engine.subscribeTo(events_1.ViewportResizeEvent, (event) => {
        var _a;
        const currentWorkspace = (_a = event === null || event === void 0 ? void 0 : event.context) === null || _a === void 0 ? void 0 : _a.workspace;
        if (!currentWorkspace)
            return;
        const viewport = currentWorkspace.viewport;
        const outline = currentWorkspace.outline;
        if (viewport.matchViewport(event.data.target)) {
            viewport.digestViewport();
        }
        if (outline.matchViewport(event.data.target)) {
            outline.digestViewport();
        }
    });
    engine.subscribeTo(events_1.ViewportScrollEvent, (event) => {
        var _a;
        const currentWorkspace = (_a = event === null || event === void 0 ? void 0 : event.context) === null || _a === void 0 ? void 0 : _a.workspace;
        if (!currentWorkspace)
            return;
        const viewport = currentWorkspace.viewport;
        const outline = currentWorkspace.outline;
        if (viewport.matchViewport(event.data.target)) {
            viewport.digestViewport();
        }
        if (outline.matchViewport(event.data.target)) {
            outline.digestViewport();
        }
    });
};
exports.useViewportEffect = useViewportEffect;
