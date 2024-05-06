import UserStore from "./user";
import AuthStore from "./auth";
import MenuStore from "./menu";
export class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  menuStore: MenuStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
    this.menuStore = new MenuStore(this);
  }
}

export type TRootStore = RootStore;
