import { TreeNode } from './TreeNode';
import { Workbench } from './Workbench';
import { Cursor } from './Cursor';
import { Keyboard } from './Keyboard';
import { Screen, ScreenType } from './Screen';
import { Event, uid, globalThisPolyfill } from '@lowcode/shared';
/**
 * 设计器引擎
 */
export class Engine extends Event {
    constructor(props) {
        super(props);
        this.props = Object.assign(Object.assign({}, Engine.defaultProps), props);
        this.init();
        this.id = uid();
    }
    init() {
        this.workbench = new Workbench(this);
        this.screen = new Screen(this);
        this.cursor = new Cursor(this);
        this.keyboard = new Keyboard(this);
    }
    setCurrentTree(tree) {
        if (this.workbench.currentWorkspace) {
            this.workbench.currentWorkspace.operation.tree.from(tree);
        }
    }
    getCurrentTree() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.workbench) === null || _a === void 0 ? void 0 : _a.currentWorkspace) === null || _b === void 0 ? void 0 : _b.operation) === null || _c === void 0 ? void 0 : _c.tree;
    }
    getAllSelectedNodes() {
        let results = [];
        for (let i = 0; i < this.workbench.workspaces.length; i++) {
            const workspace = this.workbench.workspaces[i];
            results = results.concat(workspace.operation.selection.selectedNodes);
        }
        return results;
    }
    findNodeById(id) {
        return TreeNode.findById(id);
    }
    findMovingNodes() {
        const results = [];
        this.workbench.eachWorkspace((workspace) => {
            var _a;
            (_a = workspace.operation.moveHelper.dragNodes) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
                if (!results.includes(node)) {
                    results.push(node);
                }
            });
        });
        return results;
    }
    createNode(node, parent) {
        return new TreeNode(node, parent);
    }
    mount() {
        this.attachEvents(globalThisPolyfill);
    }
    unmount() {
        this.detachEvents();
    }
}
Engine.defaultProps = {
    shortcuts: [],
    effects: [],
    drivers: [],
    rootComponentName: 'Root',
    sourceIdAttrName: 'data-designer-source-id',
    nodeIdAttrName: 'data-designer-node-id',
    contentEditableAttrName: 'data-content-editable',
    contentEditableNodeIdAttrName: 'data-content-editable-node-id',
    clickStopPropagationAttrName: 'data-click-stop-propagation',
    nodeSelectionIdAttrName: 'data-designer-node-helpers-id',
    nodeDragHandlerAttrName: 'data-designer-node-drag-handler',
    screenResizeHandlerAttrName: 'data-designer-screen-resize-handler',
    nodeResizeHandlerAttrName: 'data-designer-node-resize-handler',
    outlineNodeIdAttrName: 'data-designer-outline-node-id',
    nodeTranslateAttrName: 'data-designer-node-translate-handler',
    defaultScreenType: ScreenType.PC,
};
