export interface IHistoryProps<T> {
    onPush?: (item: T) => void;
    onRedo?: (item: T) => void;
    onUndo?: (item: T) => void;
    onGoto?: (item: T) => void;
}
export interface HistoryItem<T> {
    data: T;
    type?: string;
    timestamp: number;
}
export interface ISerializable {
    from(json: any): void;
    serialize(): any;
}
export declare class History<T extends ISerializable = any> {
    context: ISerializable;
    props: IHistoryProps<HistoryItem<T>>;
    current: number;
    history: HistoryItem<T>[];
    updateTimer: any;
    maxSize: number;
    locking: boolean;
    constructor(context: T, props?: IHistoryProps<HistoryItem<T>>);
    makeObservable(): void;
    list(): HistoryItem<T>[];
    push(type?: string): void;
    get allowUndo(): boolean;
    get allowRedo(): boolean;
    redo(): void;
    undo(): void;
    goTo(index: number): void;
    clear(): void;
}
