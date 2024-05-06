import { action, define, observable } from '@formily/reactive';
export var ScreenType;
(function (ScreenType) {
    ScreenType["PC"] = "PC";
    ScreenType["Responsive"] = "Responsive";
    ScreenType["Mobile"] = "Mobile";
    ScreenType["Sketch"] = "Sketch";
})(ScreenType || (ScreenType = {}));
export var ScreenStatus;
(function (ScreenStatus) {
    ScreenStatus["Normal"] = "Normal";
    ScreenStatus["Resizing"] = "Resizing";
    ScreenStatus["Zooming"] = "Zooming";
})(ScreenStatus || (ScreenStatus = {}));
export class Screen {
    constructor(engine) {
        this.scale = 1;
        this.width = '100%';
        this.height = '100%';
        this.background = '';
        this.flip = false;
        this.status = ScreenStatus.Normal;
        this.engine = engine;
        this.type = engine.props.defaultScreenType;
        this.makeObservable();
    }
    makeObservable() {
        define(this, {
            type: observable.ref,
            scale: observable.ref,
            width: observable.ref,
            height: observable.ref,
            status: observable.ref,
            flip: observable.ref,
            background: observable.ref,
            setType: action,
            setScale: action,
            setSize: action,
            resetSize: action,
            setBackground: action,
            setFlip: action,
        });
    }
    setStatus(status) {
        this.status = status;
    }
    setType(type) {
        this.type = type;
    }
    setScale(scale) {
        this.scale = scale;
    }
    setSize(width, height) {
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
    }
    resetSize() {
        this.width = '100%';
        this.height = '100%';
    }
    setBackground(background) {
        this.background = background;
    }
    setFlip(flip) {
        this.flip = flip;
    }
}
