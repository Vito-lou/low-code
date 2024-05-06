import { isArr } from '@lowcode/shared';
import { untracked } from '@formily/reactive';
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from './presets';
import { Engine, TreeNode } from './models';
import { mergeLocales } from './internals';
export const isBehaviorHost = (val) => (val === null || val === void 0 ? void 0 : val.Behavior) && isBehaviorList(val.Behavior);
export const isBehaviorList = (val) => Array.isArray(val) && val.every(isBehavior);
export const isBehavior = (val) => (val === null || val === void 0 ? void 0 : val.name) ||
    (val === null || val === void 0 ? void 0 : val.selector) ||
    (val === null || val === void 0 ? void 0 : val.extends) ||
    (val === null || val === void 0 ? void 0 : val.designerProps) ||
    (val === null || val === void 0 ? void 0 : val.designerLocales);
export const isResourceHost = (val) => (val === null || val === void 0 ? void 0 : val.Resource) && isResourceList(val.Resource);
export const isResourceList = (val) => Array.isArray(val) && val.every(isResource);
export const isResource = (val) => (val === null || val === void 0 ? void 0 : val.node) && !!val.node.isSourceNode && val.node instanceof TreeNode;
export const createLocales = (...packages) => {
    const results = {};
    packages.forEach((locales) => {
        mergeLocales(results, locales);
    });
    return results;
};
export const createBehavior = (...behaviors) => {
    return behaviors.reduce((buf, behavior) => {
        if (isArr(behavior))
            return buf.concat(createBehavior(...behavior));
        const { selector } = behavior || {};
        if (!selector)
            return buf;
        if (typeof selector === 'string') {
            behavior.selector = (node) => node.componentName === selector;
        }
        return buf.concat(behavior);
    }, []);
};
export const createResource = (...sources) => {
    return sources.reduce((buf, source) => {
        return buf.concat(Object.assign(Object.assign({}, source), { node: new TreeNode({
                componentName: '$$ResourceNode$$',
                isSourceNode: true,
                children: source.elements || [],
            }) }));
    }, []);
};
export const createDesigner = (props = {}) => {
    debugger;
    const drivers = props.drivers || [];
    const effects = props.effects || [];
    const shortcuts = props.shortcuts || [];
    return untracked(() => new Engine(Object.assign(Object.assign({}, props), { effects: [...effects, ...DEFAULT_EFFECTS], drivers: [...drivers, ...DEFAULT_DRIVERS], shortcuts: [...shortcuts, ...DEFAULT_SHORTCUTS] })));
};
