"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalRegistry = void 0;
const shared_1 = require("@lowcode/shared");
const path_1 = require("@formily/path");
const reactive_1 = require("@formily/reactive");
const internals_1 = require("./internals");
const externals_1 = require("./externals");
const externals_2 = require("./externals");
const getISOCode = (language) => {
    let isoCode = DESIGNER_LANGUAGE_STORE.value;
    let lang = (0, internals_1.lowerSnake)(language);
    if (DESIGNER_LOCALES_STORE.value[lang]) {
        return lang;
    }
    (0, shared_1.each)(DESIGNER_LOCALES_STORE.value, (_, key) => {
        if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
            isoCode = key;
            return false;
        }
    });
    return isoCode;
};
const reSortBehaviors = (target, sources) => {
    const findTargetBehavior = (behavior) => target.includes(behavior);
    const findSourceBehavior = (name) => {
        for (let key in sources) {
            const { Behavior } = sources[key];
            for (let i = 0; i < Behavior.length; i++) {
                if (Behavior[i].name === name)
                    return Behavior[i];
            }
        }
    };
    (0, shared_1.each)(sources, (item) => {
        if (!item)
            return;
        if (!(0, externals_1.isBehaviorHost)(item))
            return;
        const { Behavior } = item;
        (0, shared_1.each)(Behavior, (behavior) => {
            if (findTargetBehavior(behavior))
                return;
            const name = behavior.name;
            (0, shared_1.each)(behavior.extends, (dep) => {
                const behavior = findSourceBehavior(dep);
                if (!behavior)
                    throw new Error(`No ${dep} behavior that ${name} depends on`);
                if (!findTargetBehavior(behavior)) {
                    target.unshift(behavior);
                }
            });
            target.push(behavior);
        });
    });
};
const DESIGNER_BEHAVIORS_STORE = reactive_1.observable.ref([]);
const DESIGNER_ICONS_STORE = reactive_1.observable.ref({});
const DESIGNER_LOCALES_STORE = reactive_1.observable.ref({});
const DESIGNER_LANGUAGE_STORE = reactive_1.observable.ref((0, internals_1.getBrowserLanguage)());
const DESIGNER_GlobalRegistry = {
    setDesignerLanguage: (lang) => {
        DESIGNER_LANGUAGE_STORE.value = lang;
    },
    setDesignerBehaviors: (behaviors) => {
        DESIGNER_BEHAVIORS_STORE.value = behaviors.reduce((buf, behavior) => {
            if ((0, externals_1.isBehaviorHost)(behavior)) {
                return buf.concat(behavior.Behavior);
            }
            else if ((0, externals_2.isBehaviorList)(behavior)) {
                return buf.concat(behavior);
            }
            return buf;
        }, []);
    },
    getDesignerBehaviors: (node) => {
        return DESIGNER_BEHAVIORS_STORE.value.filter((pattern) => pattern.selector(node));
    },
    getDesignerIcon: (name) => {
        return DESIGNER_ICONS_STORE[name];
    },
    getDesignerLanguage: () => {
        return getISOCode(DESIGNER_LANGUAGE_STORE.value);
    },
    getDesignerMessage: (token, locales) => {
        const lang = getISOCode(DESIGNER_LANGUAGE_STORE.value);
        const locale = locales ? locales[lang] : DESIGNER_LOCALES_STORE.value[lang];
        if (!locale) {
            for (let key in DESIGNER_LOCALES_STORE.value) {
                const message = path_1.Path.getIn(DESIGNER_LOCALES_STORE.value[key], (0, internals_1.lowerSnake)(token));
                if (message)
                    return message;
            }
            return;
        }
        return path_1.Path.getIn(locale, (0, internals_1.lowerSnake)(token));
    },
    registerDesignerIcons: (map) => {
        Object.assign(DESIGNER_ICONS_STORE, map);
    },
    registerDesignerLocales: (...packages) => {
        packages.forEach((locales) => {
            (0, internals_1.mergeLocales)(DESIGNER_LOCALES_STORE.value, locales);
        });
    },
    registerDesignerBehaviors: (...packages) => {
        const results = [];
        packages.forEach((sources) => {
            reSortBehaviors(results, sources);
        });
        if (results.length) {
            DESIGNER_BEHAVIORS_STORE.value = results;
        }
    },
};
exports.GlobalRegistry = DESIGNER_GlobalRegistry;
