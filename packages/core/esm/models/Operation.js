import { TreeNode } from './TreeNode';
import { Selection } from './Selection';
import { Hover } from './Hover';
import { TransformHelper } from './TransformHelper';
import { MoveHelper } from './MoveHelper';
import { cancelIdle, isFn, requestIdle } from '@lowcode/shared';
export class Operation {
    constructor(workspace) {
        this.requests = {
            snapshot: null,
        };
        this.engine = workspace.engine;
        this.workspace = workspace;
        this.tree = new TreeNode(Object.assign(Object.assign({ componentName: this.engine.props.rootComponentName }, this.engine.props.defaultComponentTree), { operation: this }));
        this.hover = new Hover({
            operation: this,
        });
        this.selection = new Selection({
            operation: this,
        });
        this.moveHelper = new MoveHelper({
            operation: this,
        });
        this.transformHelper = new TransformHelper({
            operation: this,
        });
        this.selection.select(this.tree);
    }
    dispatch(event, callback) {
        if (this.workspace.dispatch(event) === false)
            return;
        if (isFn(callback))
            return callback();
    }
    snapshot(type) {
        cancelIdle(this.requests.snapshot);
        if (!this.workspace ||
            !this.workspace.history ||
            this.workspace.history.locking)
            return;
        this.requests.snapshot = requestIdle(() => {
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
