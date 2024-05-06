import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from '@/hooks';
import { toJS } from "mobx";
const SideBar = observer(() => {
    const navigate = useNavigate()
    const store = useStore()

    useEffect(() => {
        store?.menuStore.routesToMenus(toJS(store.userStore.menuList))
    }, [])
    const menuItems = store?.menuStore.menuItems;
    console.log('menu item ', menuItems)
    const onClick: MenuProps['onClick'] = ({ key }) => {
        console.log('dianjikey', key)
        navigate(key)
    }
    return (
        <>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                onClick={onClick}
                items={store?.menuStore.menuItems}
            />
        </>
    )
})

export default SideBar;