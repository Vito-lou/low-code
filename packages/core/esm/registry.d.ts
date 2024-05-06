import { IDesignerBehaviors, IDesignerLocales, IDesignerIcons, IBehaviorLike, IBehavior } from './types';
import { TreeNode } from './models';
declare const DESIGNER_GlobalRegistry: {
    setDesignerLanguage: (lang: string) => void;
    setDesignerBehaviors: (behaviors: IBehaviorLike[]) => void;
    getDesignerBehaviors: (node: TreeNode) => IBehavior[];
    getDesignerIcon: (name: string) => any;
    getDesignerLanguage: () => string;
    getDesignerMessage: (token: string, locales?: IDesignerLocales) => any;
    registerDesignerIcons: (map: IDesignerIcons) => void;
    registerDesignerLocales: (...packages: IDesignerLocales[]) => void;
    registerDesignerBehaviors: (...packages: IDesignerBehaviors[]) => void;
};
export type IDesignerRegistry = typeof DESIGNER_GlobalRegistry;
export declare const GlobalRegistry: IDesignerRegistry;
export {};
