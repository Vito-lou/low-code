import React from "react";
import { makeAutoObservable } from "mobx";
import type { TRootStore } from "./rootStore";
import { IMenu, IAntdMenu } from "../types";
import * as Icons from "@ant-design/icons";

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons;
const addIcon = (name: string) => {
  return React.createElement(customIcons[name]);
};
const generateMenus = (menuList: IMenu[], parentId = "0") => {
  return menuList
    .filter((item) => item.parentId === parentId && !item.isHidden)
    .map((item) => {
      const childMenus: IAntdMenu[] = generateMenus(menuList, item.id);
      const menuItem: IAntdMenu = {
        key: item.path,
        label: item.title,
        icon: item.iconClass ? addIcon(item.iconClass) : "",
      };

      if (childMenus.length > 0 && menuItem) {
        menuItem.children = childMenus;
      }
      return menuItem;
    });
};
class MenuStore {
  rootStore: TRootStore;
  menuItems: IAntdMenu[] = [];
  constructor(rootStore: TRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setMenuItems(menuItems: IAntdMenu[]) {
    this.menuItems = menuItems;
  }

  routesToMenus(menuList: IMenu[]) {
    const menuItems: IAntdMenu[] = generateMenus(menuList);
    this.setMenuItems(menuItems);
    console.log(this.menuItems);
  }
}

export default MenuStore;
