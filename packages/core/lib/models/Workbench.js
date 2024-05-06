"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workbench = void 0;
const Workspace_1 = require("./Workspace");
const reactive_1 = require("@formily/reactive");
const events_1 = require("../events");
class Workbench {
    constructor(engine) {
        this.type = 'DESIGNABLE';
        this.engine = engine;
        this.workspaces = [];
        this.currentWorkspace = null;
        this.activeWorkspace = null;
        this.makeObservable();
    }
    makeObservable() {
        (0, reactive_1.define)(this, {
            currentWorkspace: reactive_1.observable.ref,
            workspaces: reactive_1.observable.shallow,
            activeWorkspace: reactive_1.observable.ref,
            type: reactive_1.observable.ref,
            switchWorkspace: reactive_1.action,
            addWorkspace: reactive_1.action,
            removeWorkspace: reactive_1.action,
            setActiveWorkspace: reactive_1.action,
            setWorkbenchType: reactive_1.action,
        });
    }
    getEventContext() {
        return {
            engine: this.engine,
            workbench: this.engine.workbench,
            workspace: null,
            viewport: null,
        };
    }
    switchWorkspace(id) {
        const finded = this.findWorkspaceById(id);
        if (finded) {
            this.currentWorkspace = finded;
            this.engine.dispatch(new events_1.SwitchWorkspaceEvent(finded));
        }
        return this.currentWorkspace;
    }
    setActiveWorkspace(workspace) {
        this.activeWorkspace = workspace;
        return workspace;
    }
    setWorkbenchType(type) {
        this.type = type;
    }
    addWorkspace(props) {
        const finded = this.findWorkspaceById(props.id);
        if (!finded) {
            this.currentWorkspace = new Workspace_1.Workspace(this.engine, props);
            this.workspaces.push(this.currentWorkspace);
            this.engine.dispatch(new events_1.AddWorkspaceEvent(this.currentWorkspace));
            return this.currentWorkspace;
        }
        return finded;
    }
    removeWorkspace(id) {
        const findIndex = this.findWorkspaceIndexById(id);
        if (findIndex > -1 && findIndex < this.workspaces.length) {
            const findedWorkspace = this.workspaces[findIndex];
            findedWorkspace.viewport.detachEvents();
            this.workspaces.splice(findIndex, 1);
            if (findedWorkspace === this.currentWorkspace) {
                if (this.workspaces.length && this.workspaces[findIndex]) {
                    this.currentWorkspace = this.workspaces[findIndex];
                }
                else {
                    this.currentWorkspace = this.workspaces[this.workspaces.length - 1];
                }
            }
            this.engine.dispatch(new events_1.RemoveWorkspaceEvent(findedWorkspace));
        }
    }
    ensureWorkspace(props = {}) {
        const workspace = this.findWorkspaceById(props.id);
        if (workspace)
            return workspace;
        this.addWorkspace(props);
        return this.currentWorkspace;
    }
    findWorkspaceById(id) {
        return this.workspaces.find((item) => item.id === id);
    }
    findWorkspaceIndexById(id) {
        return this.workspaces.findIndex((item) => item.id === id);
    }
    mapWorkspace(callbackFn) {
        return this.workspaces.map(callbackFn);
    }
    eachWorkspace(callbackFn) {
        this.workspaces.forEach(callbackFn);
    }
}
exports.Workbench = Workbench;
