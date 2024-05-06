"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const TreeNode_1 = require("./TreeNode");
const Workbench_1 = require("./Workbench");
const Cursor_1 = require("./Cursor");
const Keyboard_1 = require("./Keyboard");
const Screen_1 = require("./Screen");
const shared_1 = require("@lowcode/shared");
/**
 * 设计器引擎
 */
class Engine extends shared_1.Event {
    constructor(props) {
        super(props);
        this.props = Object.assign(Object.assign({}, Engine.defaultProps), props);
        this.init();
        this.id = (0, shared_1.uid)();
    }
    init() {
        this.workbench = new Workbench_1.Workbench(this);
        this.screen = new Screen_1.Screen(this);
        this.cursor = new Cursor_1.Cursor(this);
        this.keyboard = new Keyboard_1.Keyboard(this);
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
        return TreeNode_1.TreeNode.findById(id);
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
        return new TreeNode_1.TreeNode(node, parent);
    }
    mount() {
        this.attachEvents(shared_1.globalThisPolyfill);
    }
    unmount() {
        this.detachEvents();
    }
}
exports.Engine = Engine;
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
    defaultScreenType: Screen_1.ScreenType.PC,
};
