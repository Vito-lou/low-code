import React from 'react'
import { Spin } from 'antd';
import { Outlet } from 'react-router-dom';

export function Home() {
  return (<div className='text-3xl font-bold underline'>123123home
    {/* <Outlet></Outlet> */}
    <Spin size='large'></Spin>
  </div>)
}
