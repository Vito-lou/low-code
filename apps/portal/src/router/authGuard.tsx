import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { ErrorBoundary } from 'react-error-boundary';
import { useStore, useToken } from '@/hooks';
import PageError from '@/pages/error/PageError';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
type Props = {
    children: React.ReactNode;
};


const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
const AuthGuard = observer(({ children }: Props) => {
    const location = useLocation()
    const hasToken = useToken();
    const store = useStore()
    store?.authStore.authenticate()
    if (store?.authStore.loading) {
        return <div>loading</div>
    }
    if (!hasToken) {
        if (whiteList.indexOf(location.pathname) !== -1) {
            return children
        } else {
            //TODO 带上redirect
            return <Navigate to="/login" replace />;
        }
    }

    if (location.pathname === '/login') {
        return <Navigate to="/" replace />;
    }
    // return { children }
    return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
})

export default AuthGuard
