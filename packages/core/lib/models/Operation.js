"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operation = void 0;
const TreeNode_1 = require("./TreeNode");
const Selection_1 = require("./Selection");
const Hover_1 = require("./Hover");
const TransformHelper_1 = require("./TransformHelper");
const MoveHelper_1 = require("./MoveHelper");
const shared_1 = require("@lowcode/shared");
class Operation {
    constructor(workspace) {
        this.requests = {
            snapshot: null,
        };
        this.engine = workspace.engine;
        this.workspace = workspace;
        this.tree = new TreeNode_1.TreeNode(Object.assign(Object.assign({ componentName: this.engine.props.rootComponentName }, this.engine.props.defaultComponentTree), { operation: this }));
        this.hover = new Hover_1.Hover({
            operation: this,
        });
        this.selection = new Selection_1.Selection({
            operation: this,
        });
        this.moveHelper = new MoveHelper_1.MoveHelper({
            operation: this,
        });
        this.transformHelper = new TransformHelper_1.TransformHelper({
            operation: this,
        });
        this.selection.select(this.tree);
    }
    dispatch(event, callback) {
        if (this.workspace.dispatch(event) === false)
            return;
        if ((0, shared_1.isFn)(callback))
            return callback();
    }
    snapshot(type) {
        (0, shared_1.cancelIdle)(this.requests.snapshot);
        if (!this.workspace ||
            !this.workspace.history ||
            this.workspace.history.locking)
            return;
        this.requests.snapshot = (0, shared_1.requestIdle)(() => {
            this.workspace.history.push(type);
        });
    }
    from(operation) {
        if (!operation)
            return;
        if (operation.tree) {
            this.tree.from(operation.tree);
        }
        if (operation.selected) {
            this.selection.selected = operation.selected;
        }
    }
    serialize() {
        return {
            tree: this.tree.serialize(),
            selected: [this.tree.id],
        };
    }
}
exports.Operation = Operation;
