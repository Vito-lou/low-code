import React from "react";
import { IMenu } from "@/types";
import { lazy } from "react";
import { lazyLoad } from "./index";
import { RouteObject, Outlet, Navigate } from "react-router-dom";
export const loadView = (path: string) => {
  console.log('ddd', path)
  // return lazyLoad(lazy(() => import(`@/pages/system/menu`)));
  return lazyLoad(lazy(() => import(`@/pages${path}`)));
};

const buildRoutes = (menuList: IMenu[], parentId = "0") => {
  return menuList
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const childRoutes: RouteObject[] = buildRoutes(menuList, item.id);
      console.log('child', childRoutes)
      const route: RouteObject = {
        path: item.path,
        handle: {
          iconClass: item.iconClass,
          key: item.id,
          label: item.title
        }
      }
      if (item.pageKey) {
        route.element = loadView(item.pageKey)

      }
      if (childRoutes.length > 0 && childRoutes[0].path) {
        route.children = [
          {
            index: true,
            element: <Navigate to={childRoutes[0]?.path} />
          },
          ...childRoutes
        ]
      }
      return route
    });
};
export default function menuToRouter(menuList: IMenu[]) {
  const routes = buildRoutes(menuList);
  console.log('route', routes)
  return routes;
}
