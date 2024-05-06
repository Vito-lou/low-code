import { makeAutoObservable } from "mobx";
import { login, logout, getInfo } from "@/api/user";
import type { TRootStore } from "./rootStore";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { TUser, IUserInfo, IMenu, IUserData } from "../types";

class UserStore {
  rootStore: TRootStore;
  token = getToken();
  userInfo: IUserInfo = {};
  menuList: IMenu[] = [];
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
    setToken(token);
  }

  setUserInfo(userInfo: IUserInfo) {
    this.userInfo = userInfo;
  }

  setMenuList(menuList: IMenu[]) {
    this.menuList = menuList;
  }

  login(userInfo: TUser): Promise<void> {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          this.setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getInfo(): Promise<IUserData> {
    return new Promise((resolve, reject) => {
      getInfo(this.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          const { userInfo, menuList } = data;
          console.log("menud", menuList);
          this.setUserInfo(userInfo);
          this.setMenuList(menuList);
          resolve(data as IUserData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          this.setToken("");
          removeToken();
          // resetRouter();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  resetToken(): Promise<void> {
    return new Promise((resolve) => {
      this.setToken("");
      removeToken();
      resolve();
    });
  }
}

export default UserStore;
