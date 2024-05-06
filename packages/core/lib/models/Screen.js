"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Screen = exports.ScreenStatus = exports.ScreenType = void 0;
const reactive_1 = require("@formily/reactive");
var ScreenType;
(function (ScreenType) {
    ScreenType["PC"] = "PC";
    ScreenType["Responsive"] = "Responsive";
    ScreenType["Mobile"] = "Mobile";
    ScreenType["Sketch"] = "Sketch";
})(ScreenType || (exports.ScreenType = ScreenType = {}));
var ScreenStatus;
(function (ScreenStatus) {
    ScreenStatus["Normal"] = "Normal";
    ScreenStatus["Resizing"] = "Resizing";
    ScreenStatus["Zooming"] = "Zooming";
})(ScreenStatus || (exports.ScreenStatus = ScreenStatus = {}));
class Screen {
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
        (0, reactive_1.define)(this, {
            type: reactive_1.observable.ref,
            scale: reactive_1.observable.ref,
            width: reactive_1.observable.ref,
            height: reactive_1.observable.ref,
            status: reactive_1.observable.ref,
            flip: reactive_1.observable.ref,
            background: reactive_1.observable.ref,
            setType: reactive_1.action,
            setScale: reactive_1.action,
            setSize: reactive_1.action,
            resetSize: reactive_1.action,
            setBackground: reactive_1.action,
            setFlip: reactive_1.action,
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
exports.Screen = Screen;
