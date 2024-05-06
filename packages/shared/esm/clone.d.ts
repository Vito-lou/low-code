type Filter = (value: any, key: string) => boolean;
export declare const shallowClone: (values: any) => any;
export declare const clone: (values: any, filter?: Filter) => any;
export {};
