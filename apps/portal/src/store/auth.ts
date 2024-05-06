import { action, makeAutoObservable } from "mobx";
import { TRootStore } from "./rootStore";
import { IMenu } from "@/types";
import { RouteObject } from "react-router-dom";
import { lazyLoad } from "@/router";
import { lazy } from "react";
import menuToRouter from "@/router/menuToRouter";
class AuthStore {
  loading: Boolean = false;
  rootStore: TRootStore;
  asyncRoutes: RouteObject[] = [];
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      authenticate: action,
    });
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  setAsyncRoutes(routes: RouteObject[]) {
    this.asyncRoutes = routes;
  }
  async authenticate() {
    try {
      if (this.rootStore.userStore.token) {
        if (!this.rootStore.userStore?.menuList?.length) {
          this.setLoading(true);
          const { menuList } = await this.rootStore.userStore.getInfo();
          await this.generateRoutes(menuList);
        }
      }
    } catch (error) {
      await this.rootStore.userStore.resetToken();
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
  async generateRoutes(menuList: IMenu[]) {
    const routes = menuToRouter(menuList);
    this.setAsyncRoutes(routes);
  }
}

export default AuthStore;
