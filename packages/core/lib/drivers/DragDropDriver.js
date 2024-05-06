"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragDropDriver = void 0;
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
const GlobalState = {
    dragging: false,
    onMouseDownAt: 0,
    startEvent: null,
    moveEvent: null,
};
class DragDropDriver extends shared_1.EventDriver {
    constructor() {
        super(...arguments);
        this.mouseDownTimer = null;
        this.onMouseDown = (e) => {
            var _a, _b;
            if (e.button !== 0 || e.ctrlKey || e.metaKey) {
                return;
            }
            //为了富文本编辑器里面跳过
            if (e.target['isContentEditable'] ||
                e.target['contentEditable'] === 'true') {
                return true;
            }
            if ((_b = (_a = e.target) === null || _a === void 0 ? void 0 : _a['closest']) === null || _b === void 0 ? void 0 : _b.call(_a, '.monaco-editor'))
                return;
            GlobalState.startEvent = e;
            GlobalState.dragging = false;
            GlobalState.onMouseDownAt = Date.now();
            this.batchAddEventListener('mouseup', this.onMouseUp);
            this.batchAddEventListener('dragend', this.onMouseUp);
            this.batchAddEventListener('dragstart', this.onStartDrag);
            this.batchAddEventListener('mousemove', this.onDistanceChange);
        };
        this.onMouseUp = (e) => {
            if (GlobalState.dragging) {
                this.dispatch(new events_1.DragStopEvent({
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    target: e.target,
                    view: e.view,
                }));
            }
            this.batchRemoveEventListener('contextmenu', this.onContextMenuWhileDragging, true);
            this.batchRemoveEventListener('mouseup', this.onMouseUp);
            this.batchRemoveEventListener('mousedown', this.onMouseDown);
            this.batchRemoveEventListener('dragover', this.onMouseMove);
            this.batchRemoveEventListener('mousemove', this.onMouseMove);
            this.batchRemoveEventListener('mousemove', this.onDistanceChange);
            GlobalState.dragging = false;
        };
        this.onMouseMove = (e) => {
            var _a, _b;
            if (e.clientX === ((_a = GlobalState.moveEvent) === null || _a === void 0 ? void 0 : _a.clientX) &&
                e.clientY === ((_b = GlobalState.moveEvent) === null || _b === void 0 ? void 0 : _b.clientY))
                return;
            this.dispatch(new events_1.DragMoveEvent({
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                target: e.target,
                view: e.view,
            }));
            GlobalState.moveEvent = e;
        };
        this.onContextMenuWhileDragging = (e) => {
            e.preventDefault();
        };
        this.onStartDrag = (e) => {
            if (GlobalState.dragging)
                return;
            GlobalState.startEvent = GlobalState.startEvent || e;
            this.batchAddEventListener('dragover', this.onMouseMove);
            this.batchAddEventListener('mousemove', this.onMouseMove);
            this.batchAddEventListener('contextmenu', this.onContextMenuWhileDragging, true);
            this.dispatch(new events_1.DragStartEvent({
                clientX: GlobalState.startEvent.clientX,
                clientY: GlobalState.startEvent.clientY,
                pageX: GlobalState.startEvent.pageX,
                pageY: GlobalState.startEvent.pageY,
                target: GlobalState.startEvent.target,
                view: GlobalState.startEvent.view,
            }));
            GlobalState.dragging = true;
        };
        this.onDistanceChange = (e) => {
            const distance = Math.sqrt(Math.pow(e.pageX - GlobalState.startEvent.pageX, 2) +
                Math.pow(e.pageY - GlobalState.startEvent.pageY, 2));
            const timeDelta = Date.now() - GlobalState.onMouseDownAt;
            if (timeDelta > 10 && e !== GlobalState.startEvent && distance > 4) {
                this.batchRemoveEventListener('mousemove', this.onDistanceChange);
                this.onStartDrag(e);
            }
        };
    }
    attach() {
        this.batchAddEventListener('mousedown', this.onMouseDown, true);
    }
    detach() {
        GlobalState.dragging = false;
        GlobalState.moveEvent = null;
        GlobalState.onMouseDownAt = null;
        GlobalState.startEvent = null;
        this.batchRemoveEventListener('mousedown', this.onMouseDown, true);
        this.batchRemoveEventListener('dragstart', this.onStartDrag);
        this.batchRemoveEventListener('dragend', this.onMouseUp);
        this.batchRemoveEventListener('dragover', this.onMouseMove);
        this.batchRemoveEventListener('mouseup', this.onMouseUp);
        this.batchRemoveEventListener('mousemove', this.onMouseMove);
        this.batchRemoveEventListener('mousemove', this.onDistanceChange);
        this.batchRemoveEventListener('contextmenu', this.onContextMenuWhileDragging, true);
    }
}
exports.DragDropDriver = DragDropDriver;
