import React, { lazy, Suspense } from "react";
import {
  Outlet,
  RouteObject,
  useRoutes,
} from "react-router-dom";
import { CircleLoading } from "@/components/loading";
//path路径，要么不带斜杠，要么把父级菜单的路径都完整带上；
// import Layout from "antd/es/layout/layout";
import { About, Home } from "../components";
import { useStore } from "@/hooks";
import { toJS } from "mobx";
import { Navigate } from "react-router-dom";
import Layout from "@/layouts";
export const lazyLoad = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<CircleLoading />}>
    <Component />
  </Suspense>
)


const Page403 = lazy(() => import('@/pages/error/403'));
const Page404 = lazy(() => import('@/pages/error/404'));
const Page500 = lazy(() => import('@/pages/error/500'));
const Studio = lazy(() => import('@/pages/studio'));
// const system = lazy(() => import('@/pages/system/menu'))
export const constantRoutes: RouteObject[] = [
  {
    path: "/login",
    Component: lazy(() => import("@/pages/login")),
  },
  {
    path: '/studio',
    element: lazyLoad(Studio),
  },
  // {
  //   path: "/",
  //   element: <Home />,
  // },
  {
    path: "500",
    element: lazyLoad(Page500)
  },
  {
    path: "403",

    element: lazyLoad(Page403)
  },
  {
    path: '*',
    element: lazyLoad(Page404),
  },
  // {
  //   path: 'system',
  //   // element: <Layout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="menu" replace />,
  //     },
  //     {
  //       path: '/system/menu',
  //       element: <Home />
  //     }
  //   ]
  // },
]
const Router = () => {
  //
  const store = useStore()
  const apiRoutes = toJS(store!?.authStore.asyncRoutes);
  const HOMEPAGE = apiRoutes[0]?.path || '/home'
  const asyncRoutes: RouteObject[] = [{
    path: '/',
    element: (<Layout />),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...apiRoutes],
  }]

  const res = constantRoutes.concat(asyncRoutes)
  const routes = useRoutes(res)
  console.log('fina', routes)
  return routes
}

export default Router
