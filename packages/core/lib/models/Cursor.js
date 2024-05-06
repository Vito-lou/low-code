"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cursor = exports.CursorType = exports.CursorDragType = exports.CursorStatus = void 0;
const reactive_1 = require("@formily/reactive");
const shared_1 = require("@lowcode/shared");
var CursorStatus;
(function (CursorStatus) {
    CursorStatus["Normal"] = "NORMAL";
    CursorStatus["DragStart"] = "DRAG_START";
    CursorStatus["Dragging"] = "DRAGGING";
    CursorStatus["DragStop"] = "DRAG_STOP";
})(CursorStatus || (exports.CursorStatus = CursorStatus = {}));
var CursorDragType;
(function (CursorDragType) {
    CursorDragType["Move"] = "MOVE";
    CursorDragType["Resize"] = "RESIZE";
    CursorDragType["Rotate"] = "ROTATE";
    CursorDragType["Scale"] = "SCALE";
    CursorDragType["Translate"] = "TRANSLATE";
    CursorDragType["Round"] = "ROUND";
})(CursorDragType || (exports.CursorDragType = CursorDragType = {}));
var CursorType;
(function (CursorType) {
    CursorType["Normal"] = "NORMAL";
    CursorType["Selection"] = "SELECTION";
    CursorType["Sketch"] = "SKETCH";
})(CursorType || (exports.CursorType = CursorType = {}));
const DEFAULT_POSITION = {
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    topPageX: 0,
    topPageY: 0,
    topClientX: 0,
    topClientY: 0,
};
const setCursorStyle = (contentWindow, style) => {
    var _a, _b, _c, _d;
    const currentRoot = (_b = (_a = document === null || document === void 0 ? void 0 : document.getElementsByTagName) === null || _a === void 0 ? void 0 : _a.call(document, 'html')) === null || _b === void 0 ? void 0 : _b[0];
    const root = (_d = (_c = contentWindow === null || contentWindow === void 0 ? void 0 : contentWindow.document) === null || _c === void 0 ? void 0 : _c.getElementsByTagName('html')) === null || _d === void 0 ? void 0 : _d[0];
    if (root && root.style.cursor !== style) {
        root.style.cursor = style;
    }
    if (currentRoot && currentRoot.style.cursor !== style) {
        currentRoot.style.cursor = style;
    }
};
const calcPositionDelta = (end, start) => {
    return Object.keys(end || {}).reduce((buf, key) => {
        if ((0, shared_1.isValidNumber)(end === null || end === void 0 ? void 0 : end[key]) && (0, shared_1.isValidNumber)(start === null || start === void 0 ? void 0 : start[key])) {
            buf[key] = end[key] - start[key];
        }
        else {
            buf[key] = end[key];
        }
        return buf;
    }, {});
};
class Cursor {
    constructor(engine) {
        this.type = CursorType.Normal;
        this.dragType = CursorDragType.Move;
        this.status = CursorStatus.Normal;
        this.position = DEFAULT_POSITION;
        this.dragAtomDelta = DEFAULT_POSITION;
        this.dragStartToCurrentDelta = DEFAULT_POSITION;
        this.dragStartToEndDelta = DEFAULT_POSITION;
        this.view = shared_1.globalThisPolyfill;
        this.engine = engine;
        this.makeObservable();
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            type: reactive_1.observable.ref,
            dragType: reactive_1.observable.ref,
            status: reactive_1.observable.ref,
            position: reactive_1.observable.ref,
            dragStartPosition: reactive_1.observable.ref,
            dragEndPosition: reactive_1.observable.ref,
            dragAtomDelta: reactive_1.observable.ref,
            dragStartToCurrentDelta: reactive_1.observable.ref,
            dragStartToEndDelta: reactive_1.observable.ref,
            view: reactive_1.observable.ref,
            setStyle: reactive_1.action,
            setPosition: reactive_1.action,
            setStatus: reactive_1.action,
            setType: reactive_1.action,
        });
    }
    get speed() {
        return Math.sqrt(Math.pow(this.dragAtomDelta.clientX, 2) +
            Math.pow(this.dragAtomDelta.clientY, 2));
    }
    setStatus(status) {
        this.status = status;
    }
    setType(type) {
        this.type = type;
    }
    setDragType(type) {
        this.dragType = type;
    }
    setStyle(style) {
        this.engine.workbench.eachWorkspace((workspace) => {
            setCursorStyle(workspace.viewport.contentWindow, style);
        });
    }
    setPosition(position) {
        this.dragAtomDelta = calcPositionDelta(this.position, position);
        this.position = Object.assign({}, position);
        if (this.status === CursorStatus.Dragging) {
            this.dragStartToCurrentDelta = calcPositionDelta(this.position, this.dragStartPosition);
        }
    }
    setDragStartPosition(position) {
        if (position) {
            this.dragStartPosition = Object.assign({}, position);
        }
        else {
            this.dragStartPosition = null;
            this.dragStartToCurrentDelta = DEFAULT_POSITION;
        }
    }
    setDragEndPosition(position) {
        if (!this.dragStartPosition)
            return;
        if (position) {
            this.dragEndPosition = Object.assign({}, position);
            this.dragStartToEndDelta = calcPositionDelta(this.dragStartPosition, this.dragEndPosition);
        }
        else {
            this.dragEndPosition = null;
            this.dragStartToEndDelta = DEFAULT_POSITION;
        }
    }
}
exports.Cursor = Cursor;
