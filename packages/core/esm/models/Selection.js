import { observable, define, action } from '@formily/reactive';
import { SelectNodeEvent, UnSelectNodeEvent } from '../events';
import { isStr, isArr } from '@lowcode/shared';
export class Selection {
    constructor(props) {
        this.selected = [];
        this.indexes = {};
        if (props.selected) {
            this.selected = props.selected;
        }
        if (props.operation) {
            this.operation = props.operation;
        }
        this.makeObservable();
    }
    makeObservable() {
        define(this, {
            selected: observable,
            select: action,
            batchSelect: action,
            add: action,
            remove: action,
            clear: action,
            crossAddTo: action,
        });
    }
    trigger(type = SelectNodeEvent) {
        return this.operation.dispatch(new type({
            target: this.operation.tree,
            source: this.selectedNodes,
        }));
    }
    select(id) {
        if (isStr(id)) {
            if (this.selected.length === 1 && this.selected.includes(id)) {
                this.trigger(SelectNodeEvent);
                return;
            }
            this.selected = [id];
            this.indexes = { [id]: true };
            this.trigger(SelectNodeEvent);
        }
        else {
            this.select(id === null || id === void 0 ? void 0 : id.id);
        }
    }
    safeSelect(id) {
        if (!id)
            return;
        this.select(id);
    }
    mapIds(ids) {
        return isArr(ids)
            ? ids.map((node) => (isStr(node) ? node : node === null || node === void 0 ? void 0 : node.id))
            : [];
    }
    batchSelect(ids) {
        this.selected = this.mapIds(ids);
        this.indexes = this.selected.reduce((buf, id) => {
            buf[id] = true;
            return buf;
        }, {});
        this.trigger(SelectNodeEvent);
    }
    batchSafeSelect(ids) {
        if (!(ids === null || ids === void 0 ? void 0 : ids.length))
            return;
        this.batchSelect(ids);
    }
    get selectedNodes() {
        return this.selected.map((id) => this.operation.tree.findById(id));
    }
    get first() {
        if (this.selected && this.selected.length)
            return this.selected[0];
    }
    get last() {
        if (this.selected && this.selected.length)
            return this.selected[this.selected.length - 1];
    }
    get length() {
        return this.selected.length;
    }
    add(...ids) {
        this.mapIds(ids).forEach((id) => {
            if (isStr(id)) {
                if (!this.selected.includes(id)) {
                    this.selected.push(id);
                    this.indexes[id] = true;
                }
            }
            else {
                this.add(id === null || id === void 0 ? void 0 : id.id);
            }
        });
        this.trigger();
    }
    crossAddTo(node) {
        if (node.parent) {
            const selectedNodes = this.selectedNodes;
            if (this.has(node)) {
                this.remove(node);
            }
            else {
                const minDistanceNode = selectedNodes.reduce((minDistanceNode, item) => {
                    return item.distanceTo(node) < minDistanceNode.distanceTo(node)
                        ? item
                        : minDistanceNode;
                }, selectedNodes[0]);
                if (minDistanceNode) {
                    const crossNodes = node.crossSiblings(minDistanceNode);
                    crossNodes.forEach((node) => {
                        if (!this.has(node.id)) {
                            this.selected.push(node.id);
                            this.indexes[node.id] = true;
                        }
                    });
                }
                if (!this.has(node.id)) {
                    this.selected.push(node.id);
                    this.indexes[node.id] = true;
                }
            }
        }
    }
    remove(...ids) {
        this.mapIds(ids).forEach((id) => {
            if (isStr(id)) {
                this.selected = this.selected.filter((item) => item !== id);
                delete this.indexes[id];
            }
            else {
                this.remove(id === null || id === void 0 ? void 0 : id.id);
            }
        });
        this.trigger(UnSelectNodeEvent);
    }
    has(...ids) {
        return this.mapIds(ids).some((id) => {
            if (isStr(id)) {
                return this.indexes[id];
            }
            else {
                if (!(id === null || id === void 0 ? void 0 : id.id))
                    return false;
                return this.has(id === null || id === void 0 ? void 0 : id.id);
            }
        });
    }
    clear() {
        this.selected = [];
        this.indexes = {};
        this.trigger(UnSelectNodeEvent);
    }
}
