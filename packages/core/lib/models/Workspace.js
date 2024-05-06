"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = void 0;
const Viewport_1 = require("./Viewport");
const Operation_1 = require("./Operation");
const History_1 = require("./History");
const shared_1 = require("@lowcode/shared");
const events_1 = require("../events");
//工作区模型
class Workspace {
    constructor(engine, props) {
        this.engine = engine;
        this.props = props;
        this.id = props.id || (0, shared_1.uid)();
        this.title = props.title;
        this.description = props.description;
        this.viewport = new Viewport_1.Viewport({
            engine: this.engine,
            workspace: this,
            viewportElement: props.viewportElement,
            contentWindow: props.contentWindow,
            nodeIdAttrName: this.engine.props.nodeIdAttrName,
            moveSensitive: true,
            moveInsertionType: 'all',
        });
        this.outline = new Viewport_1.Viewport({
            engine: this.engine,
            workspace: this,
            viewportElement: props.viewportElement,
            contentWindow: props.contentWindow,
            nodeIdAttrName: this.engine.props.outlineNodeIdAttrName,
            moveSensitive: false,
            moveInsertionType: 'block',
        });
        this.operation = new Operation_1.Operation(this);
        this.history = new History_1.History(this, {
            onPush: (item) => {
                this.operation.dispatch(new events_1.HistoryPushEvent(item));
            },
            onRedo: (item) => {
                this.operation.hover.clear();
                this.operation.dispatch(new events_1.HistoryRedoEvent(item));
            },
            onUndo: (item) => {
                this.operation.hover.clear();
                this.operation.dispatch(new events_1.HistoryUndoEvent(item));
            },
            onGoto: (item) => {
                this.operation.hover.clear();
                this.operation.dispatch(new events_1.HistoryGotoEvent(item));
            },
        });
    }
    getEventContext() {
        return {
            workbench: this.engine.workbench,
            workspace: this,
            engine: this.engine,
            viewport: this.viewport,
        };
    }
    attachEvents(container, contentWindow) {
        this.engine.attachEvents(container, contentWindow, this.getEventContext());
    }
    detachEvents(container) {
        this.engine.detachEvents(container);
    }
    dispatch(event) {
        return this.engine.dispatch(event, this.getEventContext());
    }
    serialize() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            operation: this.operation.serialize(),
        };
    }
    from(workspace) {
        if (!workspace)
            return;
        if (workspace.operation) {
            this.operation.from(workspace.operation);
        }
        if (workspace.id) {
            this.id = workspace.id;
        }
        if (workspace.title) {
            this.title = workspace.title;
        }
        if (workspace.description) {
            this.description = workspace.description;
        }
    }
}
exports.Workspace = Workspace;
