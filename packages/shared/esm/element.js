import { Point } from './coordinate';
const InlineLayoutTagNames = new Set([
    'A',
    'ABBR',
    'ACRONYM',
    'AUDIO',
    'B',
    'BDI',
    'BDO',
    'BIG',
    'BR',
    'BUTTON',
    'CANVAS',
    'CITE',
    'CODE',
    'DATA',
    'DATALIST',
    'DEL',
    'DFN',
    'EM',
    'EMBED',
    'I',
    'IFRAME',
    'IMG',
    'INS',
    'KBD',
    'LABEL',
    'MAP',
    'MARK',
    'METER',
    'NOSCRIPT',
    'OBJECT',
    'OUTPUT',
    'PICTURE',
    'PROGRESS',
    'Q',
    'RUBY',
    'S',
    'SAMP',
    'SELECT',
    'SLOT',
    'SMALL',
    'STRONG',
    'SUB',
    'SUP',
    'SVG',
    'TEMPLATE',
    'TEXTAREA',
    'TIME',
    'U',
    'TT',
    'VAR',
    'VIDEO',
    'WBR',
    'INPUT',
    'SPAN',
]);
export const calcElementOuterWidth = (innerWidth, style) => {
    return (innerWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight) +
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight) +
        parseFloat(style.borderLeftWidth) +
        parseFloat(style.borderRightWidth));
};
/**
 * 拖动一个元素到画布中，如果光标在内联元素旁边，就会在那行出现辅助线，如果是在块级元素旁边，就会在块级那出现辅助线；by loukai
 * @param element
 * @returns
 */
export const calcElementLayout = (element) => {
    if (!element)
        return 'vertical';
    const parent = element.parentElement;
    if (!parent)
        return 'vertical';
    const tagName = element.tagName;
    const parentTagName = parent.tagName;
    const style = getComputedStyle(element);
    const parentStyle = getComputedStyle(parent);
    const isNotFullWidth = () => {
        const innerWidth = element.getBoundingClientRect().width;
        const outerWidth = calcElementOuterWidth(innerWidth, style);
        const parentInnerWidth = parent.getBoundingClientRect().width;
        return outerWidth.toFixed(0) < parentInnerWidth.toFixed(0);
    };
    if (tagName === 'TH' || tagName === 'TD') {
        if (parentTagName === 'TR')
            return 'horizontal';
    }
    if (parentStyle.display === 'flex' && parentStyle.flexDirection === 'row')
        return 'horizontal';
    if (parentStyle.display === 'grid') {
        if (isNotFullWidth()) {
            return 'horizontal';
        }
    }
    if (InlineLayoutTagNames.has(tagName)) {
        if (style.display === 'block') {
            if (style.float === 'left' || style.float === 'right') {
                if (isNotFullWidth()) {
                    return 'horizontal';
                }
            }
            return 'vertical';
        }
        return 'horizontal';
    }
};
export const calcElementTranslate = (element) => {
    var _a, _b, _c;
    const transform = (_a = element === null || element === void 0 ? void 0 : element.style) === null || _a === void 0 ? void 0 : _a.transform;
    if (transform) {
        const [x, y] = (_c = (_b = transform
            .match(/translate(?:3d)?\(\s*([-\d.]+)[a-z]+?[\s,]+([-\d.]+)[a-z]+?(?:[\s,]+([-\d.]+))?[a-z]+?\s*\)/)) === null || _b === void 0 ? void 0 : _b.slice(1, 3)) !== null && _c !== void 0 ? _c : [0, 0];
        return new Point(Number(x), Number(y));
    }
    else {
        return new Point(Number(element.offsetLeft), Number(element.offsetTop));
    }
};
export const calcElementRotate = (element) => {
    var _a, _b, _c;
    const transform = (_a = element === null || element === void 0 ? void 0 : element.style) === null || _a === void 0 ? void 0 : _a.transform;
    if (transform) {
        return Number((_c = (_b = transform.match(/rotate\(\s*([-\d.]+)/)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : 0);
    }
    else {
        return 0;
    }
};
export const calcElementScale = (element) => {
    var _a, _b, _c;
    const transform = (_a = element === null || element === void 0 ? void 0 : element.style) === null || _a === void 0 ? void 0 : _a.transform;
    if (transform) {
        return Number((_c = (_b = transform.match(/scale\(\s*([-\d.]+)/)) === null || _b === void 0 ? void 0 : _b[1]) !== null && _c !== void 0 ? _c : 0);
    }
    else {
        return 0;
    }
};
