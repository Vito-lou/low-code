"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viewport = void 0;
const shared_1 = require("@lowcode/shared");
const reactive_1 = require("@formily/reactive");
/**
 * 视口模型
 */
class Viewport {
    constructor(props) {
        var _a, _b;
        this.scrollX = 0;
        this.scrollY = 0;
        this.width = 0;
        this.height = 0;
        this.mounted = false;
        this.nodeElementsStore = {};
        this.workspace = props.workspace;
        this.engine = props.engine;
        this.moveSensitive = (_a = props.moveSensitive) !== null && _a !== void 0 ? _a : false;
        this.moveInsertionType = (_b = props.moveInsertionType) !== null && _b !== void 0 ? _b : 'all';
        this.viewportElement = props.viewportElement;
        this.contentWindow = props.contentWindow;
        this.nodeIdAttrName = props.nodeIdAttrName;
        this.digestViewport();
        this.makeObservable();
        this.attachEvents();
    }
    get isScrollLeft() {
        return this.scrollX === 0;
    }
    get isScrollTop() {
        return this.scrollY === 0;
    }
    get isScrollRight() {
        var _a, _b, _c;
        if (this.isIframe) {
            return (this.width + this.contentWindow.scrollX >=
                ((_c = (_b = (_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.scrollWidth));
        }
        else if (this.viewportElement) {
            return (this.viewportElement.offsetWidth + this.scrollX >=
                this.viewportElement.scrollWidth);
        }
    }
    get isScrollBottom() {
        var _a, _b;
        if (this.isIframe) {
            if (!((_b = (_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body))
                return false;
            return (this.height + this.contentWindow.scrollY >=
                this.contentWindow.document.body.scrollHeight);
        }
        else if (this.viewportElement) {
            if (!this.viewportElement)
                return false;
            return (this.viewportElement.offsetHeight + this.viewportElement.scrollTop >=
                this.viewportElement.scrollHeight);
        }
    }
    get viewportRoot() {
        var _a, _b;
        return this.isIframe
            ? (_b = (_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body
            : this.viewportElement;
    }
    get isMaster() {
        return this.contentWindow === shared_1.globalThisPolyfill;
    }
    get isIframe() {
        var _a;
        return !!((_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.frameElement) && !this.isMaster;
    }
    get scrollContainer() {
        return this.isIframe ? this.contentWindow : this.viewportElement;
    }
    get rect() {
        const viewportElement = this.viewportElement;
        if (viewportElement)
            return viewportElement.getBoundingClientRect();
    }
    get innerRect() {
        const rect = this.rect;
        return new shared_1.Rect(0, 0, rect === null || rect === void 0 ? void 0 : rect.width, rect === null || rect === void 0 ? void 0 : rect.height);
    }
    get offsetX() {
        const rect = this.rect;
        if (!rect)
            return 0;
        return rect.x;
    }
    get offsetY() {
        const rect = this.rect;
        if (!rect)
            return 0;
        return rect.y;
    }
    get scale() {
        if (!this.viewportElement)
            return 1;
        const clientRect = this.viewportElement.getBoundingClientRect();
        const offsetWidth = this.viewportElement.offsetWidth;
        if (!clientRect.width || !offsetWidth)
            return 1;
        return Math.round(clientRect.width / offsetWidth);
    }
    get dragScrollXDelta() {
        return this.scrollX - this.dragStartSnapshot.scrollX;
    }
    get dragScrollYDelta() {
        return this.scrollY - this.dragStartSnapshot.scrollY;
    }
    cacheElements() {
        var _a;
        this.nodeElementsStore = {};
        (_a = this.viewportRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`*[${this.nodeIdAttrName}]`).forEach((element) => {
            const id = element.getAttribute(this.nodeIdAttrName);
            this.nodeElementsStore[id] = this.nodeElementsStore[id] || [];
            this.nodeElementsStore[id].push(element);
        });
    }
    clearCache() {
        this.nodeElementsStore = {};
    }
    getCurrentData() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const data = {};
        if (this.isIframe) {
            data.scrollX = ((_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.scrollX) || 0;
            data.scrollY = ((_b = this.contentWindow) === null || _b === void 0 ? void 0 : _b.scrollY) || 0;
            data.width = ((_c = this.contentWindow) === null || _c === void 0 ? void 0 : _c.innerWidth) || 0;
            data.height = ((_d = this.contentWindow) === null || _d === void 0 ? void 0 : _d.innerHeight) || 0;
        }
        else if (this.viewportElement) {
            data.scrollX = ((_e = this.viewportElement) === null || _e === void 0 ? void 0 : _e.scrollLeft) || 0;
            data.scrollY = ((_f = this.viewportElement) === null || _f === void 0 ? void 0 : _f.scrollTop) || 0;
            data.width = ((_g = this.viewportElement) === null || _g === void 0 ? void 0 : _g.clientWidth) || 0;
            data.height = ((_h = this.viewportElement) === null || _h === void 0 ? void 0 : _h.clientHeight) || 0;
        }
        return data;
    }
    takeDragStartSnapshot() {
        this.dragStartSnapshot = this.getCurrentData();
    }
    digestViewport() {
        Object.assign(this, this.getCurrentData());
    }
    elementFromPoint(point) {
        var _a;
        if ((_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.document) {
            return this.contentWindow.document.elementFromPoint(point.x, point.y);
        }
    }
    matchViewport(target) {
        var _a;
        if (this.isIframe) {
            return (target === this.viewportElement ||
                target === this.contentWindow ||
                target === ((_a = this.contentWindow) === null || _a === void 0 ? void 0 : _a.document));
        }
        else {
            return target === this.viewportElement;
        }
    }
    attachEvents() {
        const engine = this.engine;
        (0, shared_1.cancelIdle)(this.attachRequest);
        this.attachRequest = (0, shared_1.requestIdle)(() => {
            if (!engine)
                return;
            if (this.isIframe) {
                this.workspace.attachEvents(this.contentWindow, this.contentWindow);
            }
            else if ((0, shared_1.isHTMLElement)(this.viewportElement)) {
                this.workspace.attachEvents(this.viewportElement, this.contentWindow);
            }
        });
    }
    detachEvents() {
        if (this.isIframe) {
            this.workspace.detachEvents(this.contentWindow);
            this.workspace.detachEvents(this.viewportElement);
        }
        else if (this.viewportElement) {
            this.workspace.detachEvents(this.viewportElement);
        }
    }
    onMount(element, contentWindow) {
        this.mounted = true;
        this.viewportElement = element;
        this.contentWindow = contentWindow;
        this.attachEvents();
        this.digestViewport();
    }
    onUnmount() {
        this.mounted = false;
        this.detachEvents();
    }
    isPointInViewport(point, sensitive) {
        if (!this.rect)
            return false;
        if (!this.containsElement(document.elementFromPoint(point.x, point.y))) {
            return false;
        }
        return (0, shared_1.isPointInRect)(point, this.rect, sensitive);
    }
    isRectInViewport(rect) {
        if (!this.rect)
            return false;
        if (!this.containsElement(document.elementFromPoint(rect.x, rect.y))) {
            return false;
        }
        return (0, shared_1.isRectInRect)(rect, this.rect);
    }
    isPointInViewportArea(point, sensitive) {
        if (!this.rect)
            return false;
        return (0, shared_1.isPointInRect)(point, this.rect, sensitive);
    }
    isOffsetPointInViewport(point, sensitive) {
        if (!this.innerRect)
            return false;
        if (!this.containsElement(document.elementFromPoint(point.x, point.y)))
            return false;
        return (0, shared_1.isPointInRect)(point, this.innerRect, sensitive);
    }
    isOffsetRectInViewport(rect) {
        if (!this.innerRect)
            return false;
        if (!this.containsElement(document.elementFromPoint(rect.x, rect.y))) {
            return false;
        }
        return (0, shared_1.isRectInRect)(rect, this.innerRect);
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            scrollX: reactive_1.observable.ref,
            scrollY: reactive_1.observable.ref,
            width: reactive_1.observable.ref,
            height: reactive_1.observable.ref,
            digestViewport: reactive_1.action,
            viewportElement: reactive_1.observable.ref,
            contentWindow: reactive_1.observable.ref,
        });
    }
    findElementById(id) {
        var _a;
        if (!id)
            return;
        if (this.nodeElementsStore[id])
            return this.nodeElementsStore[id][0];
        return (_a = this.viewportRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`*[${this.nodeIdAttrName}='${id}']`);
    }
    findElementsById(id) {
        var _a, _b;
        if (!id)
            return [];
        if (this.nodeElementsStore[id])
            return this.nodeElementsStore[id];
        return Array.from((_b = (_a = this.viewportRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`*[${this.nodeIdAttrName}='${id}']`)) !== null && _b !== void 0 ? _b : []);
    }
    containsElement(element) {
        let root = this.viewportElement;
        if (root === element)
            return true;
        return root === null || root === void 0 ? void 0 : root.contains(element);
    }
    getOffsetPoint(topPoint) {
        const data = this.getCurrentData();
        return {
            x: topPoint.x - this.offsetX + data.scrollX,
            y: topPoint.y - this.offsetY + data.scrollY,
        };
    }
    //相对于页面
    getElementRect(element) {
        const rect = element.getBoundingClientRect();
        const offsetWidth = element['offsetWidth']
            ? element['offsetWidth']
            : rect.width;
        const offsetHeight = element['offsetHeight']
            ? element['offsetHeight']
            : rect.height;
        return new shared_1.Rect(rect.x, rect.y, this.scale !== 1 ? offsetWidth : rect.width, this.scale !== 1 ? offsetHeight : rect.height);
    }
    //相对于页面
    getElementRectById(id) {
        const elements = this.findElementsById(id);
        const rect = (0, shared_1.calcBoundingRect)(elements.map((element) => this.getElementRect(element)));
        if (rect) {
            if (this.isIframe) {
                return new shared_1.Rect(rect.x + this.offsetX, rect.y + this.offsetY, rect.width, rect.height);
            }
            else {
                return new shared_1.Rect(rect.x, rect.y, rect.width, rect.height);
            }
        }
    }
    //相对于视口
    getElementOffsetRect(element) {
        const elementRect = element.getBoundingClientRect();
        if (elementRect) {
            if (this.isIframe) {
                return new shared_1.Rect(elementRect.x + this.contentWindow.scrollX, elementRect.y + this.contentWindow.scrollY, elementRect.width, elementRect.height);
            }
            else {
                return new shared_1.Rect((elementRect.x - this.offsetX + this.viewportElement.scrollLeft) /
                    this.scale, (elementRect.y - this.offsetY + this.viewportElement.scrollTop) /
                    this.scale, elementRect.width, elementRect.height);
            }
        }
    }
    //相对于视口
    getElementOffsetRectById(id) {
        const elements = this.findElementsById(id);
        if (!elements.length)
            return;
        const elementRect = (0, shared_1.calcBoundingRect)(elements.map((element) => this.getElementRect(element)));
        if (elementRect) {
            if (this.isIframe) {
                return new shared_1.Rect(elementRect.x + this.contentWindow.scrollX, elementRect.y + this.contentWindow.scrollY, elementRect.width, elementRect.height);
            }
            else {
                return new shared_1.Rect((elementRect.x - this.offsetX + this.viewportElement.scrollLeft) /
                    this.scale, (elementRect.y - this.offsetY + this.viewportElement.scrollTop) /
                    this.scale, elementRect.width, elementRect.height);
            }
        }
    }
    getValidNodeElement(node) {
        const getNodeElement = (node) => {
            if (!node)
                return;
            const ele = this.findElementById(node.id);
            if (ele) {
                return ele;
            }
            else {
                return getNodeElement(node.parent);
            }
        };
        return getNodeElement(node);
    }
    getChildrenRect(node) {
        var _a;
        if (!((_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a.length))
            return;
        return (0, shared_1.calcBoundingRect)(node.children.reduce((buf, child) => {
            const rect = this.getValidNodeRect(child);
            if (rect) {
                return buf.concat(rect);
            }
            return buf;
        }, []));
    }
    getChildrenOffsetRect(node) {
        var _a;
        if (!((_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a.length))
            return;
        return (0, shared_1.calcBoundingRect)(node.children.reduce((buf, child) => {
            const rect = this.getValidNodeOffsetRect(child);
            if (rect) {
                return buf.concat(rect);
            }
            return buf;
        }, []));
    }
    getValidNodeRect(node) {
        if (!node)
            return;
        const rect = this.getElementRectById(node.id);
        if (node && node === node.root && node.isInOperation) {
            if (!rect)
                return this.rect;
            return (0, shared_1.calcBoundingRect)([this.rect, rect]);
        }
        if (rect) {
            return rect;
        }
        else {
            return this.getChildrenRect(node);
        }
    }
    getValidNodeOffsetRect(node) {
        if (!node)
            return;
        const rect = this.getElementOffsetRectById(node.id);
        if (node && node === node.root && node.isInOperation) {
            if (!rect)
                return this.innerRect;
            return (0, shared_1.calcBoundingRect)([this.innerRect, rect]);
        }
        if (rect) {
            return rect;
        }
        else {
            return this.getChildrenOffsetRect(node);
        }
    }
    getValidNodeLayout(node) {
        var _a, _b;
        if (!node)
            return 'vertical';
        if ((_b = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.designerProps) === null || _b === void 0 ? void 0 : _b.inlineChildrenLayout)
            return 'horizontal';
        return (0, shared_1.calcElementLayout)(this.findElementById(node.id));
    }
}
exports.Viewport = Viewport;
