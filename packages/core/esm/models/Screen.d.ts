import { Engine } from './Engine';
export declare enum ScreenType {
    PC = "PC",
    Responsive = "Responsive",
    Mobile = "Mobile",
    Sketch = "Sketch"
}
export declare enum ScreenStatus {
    Normal = "Normal",
    Resizing = "Resizing",
    Zooming = "Zooming"
}
export declare class Screen {
    type: ScreenType;
    scale: number;
    width: number | string;
    height: number | string;
    engine: Engine;
    background: string;
    flip: boolean;
    status: ScreenStatus;
    constructor(engine: Engine);
    makeObservable(): void;
    setStatus(status: ScreenStatus): void;
    setType(type: ScreenType): void;
    setScale(scale: number): void;
    setSize(width?: number | string, height?: number | string): void;
    resetSize(): void;
    setBackground(background: string): void;
    setFlip(flip: boolean): void;
}
