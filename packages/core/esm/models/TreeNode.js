import { action, define, observable, toJS } from '@formily/reactive';
import { uid, isFn, each } from '@lowcode/shared';
import { InsertBeforeEvent, InsertAfterEvent, InsertChildrenEvent, PrependNodeEvent, AppendNodeEvent, WrapNodeEvent, UpdateChildrenEvent, RemoveNodeEvent, UpdateNodePropsEvent, CloneNodeEvent, FromNodeEvent, } from '../events';
import { GlobalRegistry } from '../registry';
import { mergeLocales } from '../internals';
const TreeNodes = new Map();
const CommonDesignerPropsMap = new Map();
const removeNode = (node) => {
    if (node.parent) {
        node.parent.children = node.parent.children.filter((child) => child !== node);
    }
};
const resetNodesParent = (nodes, parent) => {
    const resetDepth = (node) => {
        node.depth = node.parent ? node.parent.depth + 1 : 0;
        node.children.forEach(resetDepth);
    };
    const shallowReset = (node) => {
        node.parent = parent;
        node.root = parent.root;
        resetDepth(node);
    };
    const deepReset = (node) => {
        shallowReset(node);
        resetNodesParent(node.children, node);
    };
    return nodes.map((node) => {
        var _a;
        if (node === parent)
            return node;
        if (!parent.isSourceNode) {
            if (node.isSourceNode) {
                node = node.clone(parent);
                resetDepth(node);
            }
            else if (!node.isRoot && node.isInOperation) {
                (_a = node.operation) === null || _a === void 0 ? void 0 : _a.selection.remove(node);
                removeNode(node);
                shallowReset(node);
            }
            else {
                deepReset(node);
            }
        }
        else {
            deepReset(node);
        }
        if (!TreeNodes.has(node.id)) {
            TreeNodes.set(node.id, node);
            CommonDesignerPropsMap.set(node.componentName, node.designerProps);
        }
        return node;
    });
};
const resetParent = (node, parent) => {
    return resetNodesParent([node], parent)[0];
};
const resolveDesignerProps = (node, props) => {
    if (isFn(props))
        return props(node);
    return props;
};
export class TreeNode {
    constructor(node, parent) {
        this.depth = 0;
        this.hidden = false;
        this.componentName = 'NO_NAME_COMPONENT';
        this.sourceName = '';
        this.props = {};
        this.children = [];
        if (node instanceof TreeNode) {
            return node;
        }
        this.id = node.id || uid();
        if (parent) {
            this.parent = parent;
            this.depth = parent.depth + 1;
            this.root = parent.root;
            TreeNodes.set(this.id, this);
        }
        else {
            this.root = this;
            this.rootOperation = node.operation;
            this.isSelfSourceNode = node.isSourceNode || false;
            TreeNodes.set(this.id, this);
        }
        if (node) {
            this.from(node);
        }
        this.makeObservable();
    }
    makeObservable() {
        define(this, {
            componentName: observable.ref,
            props: observable,
            hidden: observable.ref,
            children: observable.shallow,
            designerProps: observable.computed,
            designerLocales: observable.computed,
            wrap: action,
            prepend: action,
            append: action,
            insertAfter: action,
            insertBefore: action,
            remove: action,
            setProps: action,
            setChildren: action,
            setComponentName: action,
        });
    }
    get designerProps() {
        const behaviors = GlobalRegistry.getDesignerBehaviors(this);
        const designerProps = behaviors.reduce((buf, pattern) => {
            if (!pattern.designerProps)
                return buf;
            Object.assign(buf, resolveDesignerProps(this, pattern.designerProps));
            return buf;
        }, {});
        return designerProps;
    }
    get designerLocales() {
        const behaviors = GlobalRegistry.getDesignerBehaviors(this);
        const designerLocales = behaviors.reduce((buf, pattern) => {
            if (!pattern.designerLocales)
                return buf;
            mergeLocales(buf, pattern.designerLocales);
            return buf;
        }, {});
        return designerLocales;
    }
    get previous() {
        if (this.parent === this || !this.parent)
            return;
        return this.parent.children[this.index - 1];
    }
    get next() {
        if (this.parent === this || !this.parent)
            return;
        return this.parent.children[this.index + 1];
    }
    get siblings() {
        if (this.parent) {
            return this.parent.children.filter((node) => node !== this);
        }
        return [];
    }
    get index() {
        if (this.parent === this || !this.parent)
            return 0;
        return this.parent.children.indexOf(this);
    }
    get descendants() {
        return this.children.reduce((buf, node) => {
            return buf.concat(node).concat(node.descendants);
        }, []);
    }
    get isRoot() {
        return this === this.root;
    }
    get isInOperation() {
        return !!this.operation;
    }
    get lastChild() {
        return this.children[this.children.length - 1];
    }
    get firstChild() {
        return this.children[0];
    }
    get isSourceNode() {
        return this.root.isSelfSourceNode;
    }
    get operation() {
        var _a;
        return (_a = this.root) === null || _a === void 0 ? void 0 : _a.rootOperation;
    }
    get viewport() {
        var _a, _b;
        return (_b = (_a = this.operation) === null || _a === void 0 ? void 0 : _a.workspace) === null || _b === void 0 ? void 0 : _b.viewport;
    }
    get outline() {
        var _a, _b;
        return (_b = (_a = this.operation) === null || _a === void 0 ? void 0 : _a.workspace) === null || _b === void 0 ? void 0 : _b.outline;
    }
    get moveLayout() {
        var _a;
        return (_a = this.viewport) === null || _a === void 0 ? void 0 : _a.getValidNodeLayout(this);
    }
    getElement(area = 'viewport') {
        var _a;
        return (_a = this[area]) === null || _a === void 0 ? void 0 : _a.findElementById(this.id);
    }
    getValidElement(area = 'viewport') {
        var _a;
        return (_a = this[area]) === null || _a === void 0 ? void 0 : _a.getValidNodeElement(this);
    }
    getElementRect(area = 'viewport') {
        var _a;
        return (_a = this[area]) === null || _a === void 0 ? void 0 : _a.getElementRect(this.getElement(area));
    }
    getValidElementRect(area = 'viewport') {
        var _a;
        return (_a = this[area]) === null || _a === void 0 ? void 0 : _a.getValidNodeRect(this);
    }
    getElementOffsetRect(area = 'viewport') {
        var _a;
        return (_a = this[area]) === null || _a === void 0 ? void 0 : _a.getElementOffsetRect(this.getElement(area));
    }
    getValidElementOffsetRect(area = 'viewport') {
        var _a;
        return (_a = this[area]) === null || _a === void 0 ? void 0 : _a.getValidNodeOffsetRect(this);
    }
    getPrevious(step = 1) {
        return this.parent.children[this.index - step];
    }
    getAfter(step = 1) {
        return this.parent.children[this.index + step];
    }
    getSibling(index = 0) {
        return this.parent.children[index];
    }
    getParents(node) {
        const _node = node || this;
        return (_node === null || _node === void 0 ? void 0 : _node.parent)
            ? [_node.parent].concat(this.getParents(_node.parent))
            : [];
    }
    getParentByDepth(depth = 0) {
        let parent = this.parent;
        if ((parent === null || parent === void 0 ? void 0 : parent.depth) === depth) {
            return parent;
        }
        else {
            return parent === null || parent === void 0 ? void 0 : parent.getParentByDepth(depth);
        }
    }
    getMessage(token) {
        return GlobalRegistry.getDesignerMessage(token, this.designerLocales);
    }
    isMyAncestor(node) {
        if (node === this || this.parent === node)
            return false;
        return node.contains(this);
    }
    isMyParent(node) {
        return this.parent === node;
    }
    isMyParents(node) {
        if (node === this)
            return false;
        return this.isMyParent(node) || this.isMyAncestor(node);
    }
    isMyChild(node) {
        return node.isMyParent(this);
    }
    isMyChildren(node) {
        return node.isMyParents(this);
    }
    takeSnapshot(type) {
        var _a;
        (_a = this.operation) === null || _a === void 0 ? void 0 : _a.snapshot(type);
    }
    triggerMutation(event, callback, defaults) {
        if (this.operation) {
            const result = this.operation.dispatch(event, callback) || defaults;
            this.takeSnapshot(event === null || event === void 0 ? void 0 : event.type);
            return result;
        }
        else if (isFn(callback)) {
            return callback();
        }
    }
    find(finder) {
        if (finder(this)) {
            return this;
        }
        else {
            let result = undefined;
            this.eachChildren((node) => {
                if (finder(node)) {
                    result = node;
                    return false;
                }
            });
            return result;
        }
    }
    findAll(finder) {
        const results = [];
        if (finder(this)) {
            results.push(this);
        }
        this.eachChildren((node) => {
            if (finder(node)) {
                results.push(node);
            }
        });
        return results;
    }
    distanceTo(node) {
        if (this.root !== node.root) {
            return Infinity;
        }
        if (this.parent !== node.parent) {
            return Infinity;
        }
        return Math.abs(this.index - node.index);
    }
    crossSiblings(node) {
        if (this.parent !== node.parent)
            return [];
        const minIndex = Math.min(this.index, node.index);
        const maxIndex = Math.max(this.index, node.index);
        const results = [];
        for (let i = minIndex + 1; i < maxIndex; i++) {
            results.push(this.parent.children[i]);
        }
        return results;
    }
    allowSibling(nodes) {
        var _a, _b, _c;
        if (((_b = (_a = this.designerProps) === null || _a === void 0 ? void 0 : _a.allowSiblings) === null || _b === void 0 ? void 0 : _b.call(_a, this, nodes)) === false)
            return false;
        return (_c = this.parent) === null || _c === void 0 ? void 0 : _c.allowAppend(nodes);
    }
    allowDrop(parent) {
        if (!isFn(this.designerProps.allowDrop))
            return true;
        return this.designerProps.allowDrop(parent);
    }
    allowAppend(nodes) {
        var _a, _b, _c;
        if (!((_a = this.designerProps) === null || _a === void 0 ? void 0 : _a.droppable))
            return false;
        if (((_c = (_b = this.designerProps) === null || _b === void 0 ? void 0 : _b.allowAppend) === null || _c === void 0 ? void 0 : _c.call(_b, this, nodes)) === false)
            return false;
        if (nodes.some((node) => !node.allowDrop(this)))
            return false;
        if (this.root === this)
            return true;
        return true;
    }
    allowClone() {
        var _a;
        if (this === this.root)
            return false;
        return (_a = this.designerProps.cloneable) !== null && _a !== void 0 ? _a : true;
    }
    allowDrag() {
        var _a;
        if (this === this.root && !this.isSourceNode)
            return false;
        return (_a = this.designerProps.draggable) !== null && _a !== void 0 ? _a : true;
    }
    allowResize() {
        if (this === this.root && !this.isSourceNode)
            return false;
        const { resizable } = this.designerProps;
        if (!resizable)
            return false;
        if (resizable.width && resizable.height)
            return ['x', 'y'];
        if (resizable.width)
            return ['x'];
        return ['y'];
    }
    allowRotate() { }
    allowRound() { }
    allowScale() { }
    allowTranslate() {
        if (this === this.root && !this.isSourceNode)
            return false;
        const { translatable } = this.designerProps;
        if ((translatable === null || translatable === void 0 ? void 0 : translatable.x) && (translatable === null || translatable === void 0 ? void 0 : translatable.y))
            return true;
        return false;
    }
    allowDelete() {
        var _a;
        if (this === this.root)
            return false;
        return (_a = this.designerProps.deletable) !== null && _a !== void 0 ? _a : true;
    }
    findById(id) {
        var _a;
        if (!id)
            return;
        if (this.id === id)
            return this;
        if (((_a = this.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            return TreeNodes.get(id);
        }
    }
    contains(...nodes) {
        return nodes.every((node) => {
            if (node === this ||
                (node === null || node === void 0 ? void 0 : node.parent) === this ||
                (node === null || node === void 0 ? void 0 : node.getParentByDepth(this.depth)) === this) {
                return true;
            }
            return false;
        });
    }
    eachTree(callback) {
        var _a;
        if (isFn(callback)) {
            callback(this.root);
            (_a = this.root) === null || _a === void 0 ? void 0 : _a.eachChildren(callback);
        }
    }
    eachChildren(callback) {
        if (isFn(callback)) {
            for (let i = 0; i < this.children.length; i++) {
                const node = this.children[i];
                if (callback(node) === false)
                    return;
                node.eachChildren(callback);
            }
        }
    }
    resetNodesParent(nodes, parent) {
        return resetNodesParent(nodes.filter((node) => node !== this), parent);
    }
    setProps(props) {
        return this.triggerMutation(new UpdateNodePropsEvent({
            target: this,
            source: null,
        }), () => {
            Object.assign(this.props, props);
        });
    }
    setComponentName(componentName) {
        this.componentName = componentName;
    }
    prepend(...nodes) {
        if (nodes.some((node) => node.contains(this)))
            return [];
        const originSourceParents = nodes.map((node) => node.parent);
        const newNodes = this.resetNodesParent(nodes, this);
        if (!newNodes.length)
            return [];
        return this.triggerMutation(new PrependNodeEvent({
            originSourceParents,
            target: this,
            source: newNodes,
        }), () => {
            this.children = newNodes.concat(this.children);
            return newNodes;
        }, []);
    }
    append(...nodes) {
        if (nodes.some((node) => node.contains(this)))
            return [];
        const originSourceParents = nodes.map((node) => node.parent);
        const newNodes = this.resetNodesParent(nodes, this);
        if (!newNodes.length)
            return [];
        return this.triggerMutation(new AppendNodeEvent({
            originSourceParents,
            target: this,
            source: newNodes,
        }), () => {
            this.children = this.children.concat(newNodes);
            return newNodes;
        }, []);
    }
    wrap(wrapper) {
        if (wrapper === this)
            return;
        const parent = this.parent;
        return this.triggerMutation(new WrapNodeEvent({
            target: this,
            source: wrapper,
        }), () => {
            resetParent(this, wrapper);
            resetParent(wrapper, parent);
            return wrapper;
        });
    }
    insertAfter(...nodes) {
        var _a;
        const parent = this.parent;
        if (nodes.some((node) => node.contains(this)))
            return [];
        if ((_a = parent === null || parent === void 0 ? void 0 : parent.children) === null || _a === void 0 ? void 0 : _a.length) {
            const originSourceParents = nodes.map((node) => node.parent);
            const newNodes = this.resetNodesParent(nodes, parent);
            if (!newNodes.length)
                return [];
            return this.triggerMutation(new InsertAfterEvent({
                originSourceParents,
                target: this,
                source: newNodes,
            }), () => {
                parent.children = parent.children.reduce((buf, node) => {
                    if (node === this) {
                        return buf.concat([node]).concat(newNodes);
                    }
                    else {
                        return buf.concat([node]);
                    }
                }, []);
                return newNodes;
            }, []);
        }
        return [];
    }
    insertBefore(...nodes) {
        var _a;
        const parent = this.parent;
        if (nodes.some((node) => node.contains(this)))
            return [];
        if ((_a = parent === null || parent === void 0 ? void 0 : parent.children) === null || _a === void 0 ? void 0 : _a.length) {
            const originSourceParents = nodes.map((node) => node.parent);
            const newNodes = this.resetNodesParent(nodes, parent);
            if (!newNodes.length)
                return [];
            return this.triggerMutation(new InsertBeforeEvent({
                originSourceParents,
                target: this,
                source: newNodes,
            }), () => {
                parent.children = parent.children.reduce((buf, node) => {
                    if (node === this) {
                        return buf.concat(newNodes).concat([node]);
                    }
                    else {
                        return buf.concat([node]);
                    }
                }, []);
                return newNodes;
            }, []);
        }
        return [];
    }
    insertChildren(start, ...nodes) {
        var _a;
        if (nodes.some((node) => node.contains(this)))
            return [];
        if ((_a = this.children) === null || _a === void 0 ? void 0 : _a.length) {
            const originSourceParents = nodes.map((node) => node.parent);
            const newNodes = this.resetNodesParent(nodes, this);
            if (!newNodes.length)
                return [];
            return this.triggerMutation(new InsertChildrenEvent({
                originSourceParents,
                target: this,
                source: newNodes,
            }), () => {
                this.children = this.children.reduce((buf, node, index) => {
                    if (index === start) {
                        return buf.concat(newNodes).concat([node]);
                    }
                    return buf.concat([node]);
                }, []);
                return newNodes;
            }, []);
        }
        return [];
    }
    setChildren(...nodes) {
        const originSourceParents = nodes.map((node) => node.parent);
        const newNodes = this.resetNodesParent(nodes, this);
        return this.triggerMutation(new UpdateChildrenEvent({
            originSourceParents,
            target: this,
            source: newNodes,
        }), () => {
            this.children = newNodes;
            return newNodes;
        }, []);
    }
    /**
     * @deprecated
     * please use `setChildren`
     */
    setNodeChildren(...nodes) {
        return this.setChildren(...nodes);
    }
    remove() {
        return this.triggerMutation(new RemoveNodeEvent({
            target: this,
            source: null,
        }), () => {
            removeNode(this);
            TreeNodes.delete(this.id);
        });
    }
    clone(parent) {
        const newNode = new TreeNode({
            id: uid(),
            componentName: this.componentName,
            sourceName: this.sourceName,
            props: toJS(this.props),
            children: [],
        }, parent ? parent : this.parent);
        newNode.children = resetNodesParent(this.children.map((child) => {
            return child.clone(newNode);
        }), newNode);
        return this.triggerMutation(new CloneNodeEvent({
            target: this,
            source: newNode,
        }), () => newNode);
    }
    from(node) {
        if (!node)
            return;
        return this.triggerMutation(new FromNodeEvent({
            target: this,
            source: node,
        }), () => {
            var _a, _b, _c;
            if (node.id && node.id !== this.id) {
                TreeNodes.delete(this.id);
                TreeNodes.set(node.id, this);
                this.id = node.id;
            }
            if (node.componentName) {
                this.componentName = node.componentName;
            }
            this.props = (_a = node.props) !== null && _a !== void 0 ? _a : {};
            if (node.hidden) {
                this.hidden = node.hidden;
            }
            if (node.children) {
                this.children =
                    ((_c = (_b = node.children) === null || _b === void 0 ? void 0 : _b.map) === null || _c === void 0 ? void 0 : _c.call(_b, (node) => {
                        return new TreeNode(node, this);
                    })) || [];
            }
        });
    }
    serialize() {
        return {
            id: this.id,
            componentName: this.componentName,
            sourceName: this.sourceName,
            props: toJS(this.props),
            hidden: this.hidden,
            children: this.children.map((treeNode) => {
                return treeNode.serialize();
            }),
        };
    }
    static create(node, parent) {
        return new TreeNode(node, parent);
    }
    static findById(id) {
        return TreeNodes.get(id);
    }
    static remove(nodes = []) {
        var _a, _b;
        for (let i = nodes.length - 1; i >= 0; i--) {
            const node = nodes[i];
            if (node.allowDelete()) {
                const previous = node.previous;
                const next = node.next;
                node.remove();
                (_a = node.operation) === null || _a === void 0 ? void 0 : _a.selection.select(previous ? previous : next ? next : node.parent);
                (_b = node.operation) === null || _b === void 0 ? void 0 : _b.hover.clear();
            }
        }
    }
    static sort(nodes = []) {
        return nodes.sort((before, after) => {
            if (before.depth !== after.depth)
                return 0;
            return before.index - after.index >= 0 ? 1 : -1;
        });
    }
    static clone(nodes = []) {
        const groups = {};
        const lastGroupNode = {};
        const filterNestedNode = TreeNode.sort(nodes).filter((node) => {
            return !nodes.some((parent) => {
                return node.isMyParents(parent);
            });
        });
        each(filterNestedNode, (node) => {
            var _a, _b, _c, _d, _e, _f, _g;
            if (node === node.root)
                return;
            if (!node.allowClone())
                return;
            if (!(node === null || node === void 0 ? void 0 : node.operation))
                return;
            groups[(_a = node === null || node === void 0 ? void 0 : node.parent) === null || _a === void 0 ? void 0 : _a.id] = groups[(_b = node === null || node === void 0 ? void 0 : node.parent) === null || _b === void 0 ? void 0 : _b.id] || [];
            groups[(_c = node === null || node === void 0 ? void 0 : node.parent) === null || _c === void 0 ? void 0 : _c.id].push(node);
            if (lastGroupNode[(_d = node === null || node === void 0 ? void 0 : node.parent) === null || _d === void 0 ? void 0 : _d.id]) {
                if (node.index > lastGroupNode[(_e = node === null || node === void 0 ? void 0 : node.parent) === null || _e === void 0 ? void 0 : _e.id].index) {
                    lastGroupNode[(_f = node === null || node === void 0 ? void 0 : node.parent) === null || _f === void 0 ? void 0 : _f.id] = node;
                }
            }
            else {
                lastGroupNode[(_g = node === null || node === void 0 ? void 0 : node.parent) === null || _g === void 0 ? void 0 : _g.id] = node;
            }
        });
        const parents = new Map();
        each(groups, (nodes, parentId) => {
            const lastNode = lastGroupNode[parentId];
            let insertPoint = lastNode;
            each(nodes, (node) => {
                var _a, _b;
                const cloned = node.clone();
                if (!cloned)
                    return;
                if (((_a = node.operation) === null || _a === void 0 ? void 0 : _a.selection.has(node)) &&
                    insertPoint.parent.allowAppend([cloned])) {
                    insertPoint.insertAfter(cloned);
                    insertPoint = insertPoint.next;
                }
                else if (node.operation.selection.length === 1) {
                    const targetNode = (_b = node.operation) === null || _b === void 0 ? void 0 : _b.tree.findById(node.operation.selection.first);
                    let cloneNodes = parents.get(targetNode);
                    if (!cloneNodes) {
                        cloneNodes = [];
                        parents.set(targetNode, cloneNodes);
                    }
                    if (targetNode && targetNode.allowAppend([cloned])) {
                        cloneNodes.push(cloned);
                    }
                }
            });
        });
        parents.forEach((nodes, target) => {
            if (!nodes.length)
                return;
            target.append(...nodes);
        });
    }
    static filterResizable(nodes = []) {
        return nodes.filter((node) => node.allowResize());
    }
    static filterRotatable(nodes = []) {
        return nodes.filter((node) => node.allowRotate());
    }
    static filterScalable(nodes = []) {
        return nodes.filter((node) => node.allowScale());
    }
    static filterRoundable(nodes = []) {
        return nodes.filter((node) => node.allowRound());
    }
    static filterTranslatable(nodes = []) {
        return nodes.filter((node) => node.allowTranslate());
    }
    static filterDraggable(nodes = []) {
        return nodes.reduce((buf, node) => {
            var _a;
            if (!node.allowDrag())
                return buf;
            if (isFn((_a = node === null || node === void 0 ? void 0 : node.designerProps) === null || _a === void 0 ? void 0 : _a.getDragNodes)) {
                const transformed = node.designerProps.getDragNodes(node);
                return transformed ? buf.concat(transformed) : buf;
            }
            if (node.componentName === '$$ResourceNode$$')
                return buf.concat(node.children);
            return buf.concat([node]);
        }, []);
    }
    static filterDroppable(nodes = [], parent) {
        return nodes.reduce((buf, node) => {
            var _a;
            if (!node.allowDrop(parent))
                return buf;
            if (isFn((_a = node.designerProps) === null || _a === void 0 ? void 0 : _a.getDropNodes)) {
                const cloned = node.isSourceNode ? node.clone(node.parent) : node;
                const transformed = node.designerProps.getDropNodes(cloned, parent);
                return transformed ? buf.concat(transformed) : buf;
            }
            if (node.componentName === '$$ResourceNode$$')
                return buf.concat(node.children);
            return buf.concat([node]);
        }, []);
    }
}
