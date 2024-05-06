import { MenuItemType } from "antd/es/menu/hooks/useItems";
export type TUser = {
  username: string;
  password: string;
  remember?: string;
};

export interface IUserInfo {
  name?: string;
}

export interface IMenu {
  id: string;
  path: string;
  auth?: boolean;
  title?: string;
  pageKey: string; //组件页面标识key
  iconClass?: string;
  element: any;
  isHidden?: boolean;
  parentId: string;
}

export interface IUserData {
  userInfo: IUserInfo;
  menuList: IMenu[];
}

export interface IRouterMap {
  path: string;
  auth: boolean;
  title: string;
  key: string;
  iconClass?: string;
  element: any;
  isHidden?: boolean;
  children?: IChilRouterMap[];
}

export interface IChilRouterMap extends IRouterMap {
  parentPath: string;
}

export interface IAntdMenu extends MenuItemType {
  //key
  key: string;

  //名称
  label?: string;

  //类型
  type?: string;

  //收缩展示标题
  title?: string;

  //图标
  icon?: React.ReactNode;

  //是否启用
  disabled?: boolean;

  //展示错误样式
  danger?: boolean;

  //主题
  theme?: string;

  //子菜单
  children?: IAntdMenu[];
}
