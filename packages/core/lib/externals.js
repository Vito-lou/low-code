"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDesigner = exports.createResource = exports.createBehavior = exports.createLocales = exports.isResource = exports.isResourceList = exports.isResourceHost = exports.isBehavior = exports.isBehaviorList = exports.isBehaviorHost = void 0;
const shared_1 = require("@lowcode/shared");
const reactive_1 = require("@formily/reactive");
const presets_1 = require("./presets");
const models_1 = require("./models");
const internals_1 = require("./internals");
const isBehaviorHost = (val) => (val === null || val === void 0 ? void 0 : val.Behavior) && (0, exports.isBehaviorList)(val.Behavior);
exports.isBehaviorHost = isBehaviorHost;
const isBehaviorList = (val) => Array.isArray(val) && val.every(exports.isBehavior);
exports.isBehaviorList = isBehaviorList;
const isBehavior = (val) => (val === null || val === void 0 ? void 0 : val.name) ||
    (val === null || val === void 0 ? void 0 : val.selector) ||
    (val === null || val === void 0 ? void 0 : val.extends) ||
    (val === null || val === void 0 ? void 0 : val.designerProps) ||
    (val === null || val === void 0 ? void 0 : val.designerLocales);
exports.isBehavior = isBehavior;
const isResourceHost = (val) => (val === null || val === void 0 ? void 0 : val.Resource) && (0, exports.isResourceList)(val.Resource);
exports.isResourceHost = isResourceHost;
const isResourceList = (val) => Array.isArray(val) && val.every(exports.isResource);
exports.isResourceList = isResourceList;
const isResource = (val) => (val === null || val === void 0 ? void 0 : val.node) && !!val.node.isSourceNode && val.node instanceof models_1.TreeNode;
exports.isResource = isResource;
const createLocales = (...packages) => {
    const results = {};
    packages.forEach((locales) => {
        (0, internals_1.mergeLocales)(results, locales);
    });
    return results;
};
exports.createLocales = createLocales;
const createBehavior = (...behaviors) => {
    return behaviors.reduce((buf, behavior) => {
        if ((0, shared_1.isArr)(behavior))
            return buf.concat((0, exports.createBehavior)(...behavior));
        const { selector } = behavior || {};
        if (!selector)
            return buf;
        if (typeof selector === 'string') {
            behavior.selector = (node) => node.componentName === selector;
        }
        return buf.concat(behavior);
    }, []);
};
exports.createBehavior = createBehavior;
const createResource = (...sources) => {
    return sources.reduce((buf, source) => {
        return buf.concat(Object.assign(Object.assign({}, source), { node: new models_1.TreeNode({
                componentName: '$$ResourceNode$$',
                isSourceNode: true,
                children: source.elements || [],
            }) }));
    }, []);
};
exports.createResource = createResource;
const createDesigner = (props = {}) => {
    const drivers = props.drivers || [];
    const effects = props.effects || [];
    const shortcuts = props.shortcuts || [];
    return (0, reactive_1.untracked)(() => new models_1.Engine(Object.assign(Object.assign({}, props), { effects: [...effects, ...presets_1.DEFAULT_EFFECTS], drivers: [...drivers, ...presets_1.DEFAULT_DRIVERS], shortcuts: [...shortcuts, ...presets_1.DEFAULT_SHORTCUTS] })));
};
exports.createDesigner = createDesigner;
