import React, { useEffect, useState } from "react";
import './index.less'

import { PageDesigner } from './PageDesigner'
import { DomainModelDesigner } from './DbDesigner'
import { useWorkbench } from "@lowcode/react";
export interface Itab {
  name: string;
  id: string;
  workspaceType: 'form' | 'domainModel';
}
export const Main = () => {
  const [activeTabKey, setActiveTabKey] = useState('123')
  const workbench = useWorkbench()
  const tabs: Itab[] = [
    {
      name: 'tab1',
      id: '123',
      workspaceType: 'form'
    },
    {
      name: 'tab2',
      id: "345",
      workspaceType: 'domainModel'
    }
  ]

  const handleTabChange = (key: string) => {
    console.log('工作区又多少', workbench.workspaces);
    setActiveTabKey(key)
    // console.log('what key', key)
    // const tab = tabs.find(tab => tab.id === key)
    // console.log('wht tab', tab)
    // if (tab) {
    //   console.log('type', tab.workspaceType)
    //   // const currentWorkspace = workbench.switchWorkspace(tab.workspaceType)
    //   // console.log('curre', currentWorkspace)
    //   // debugger
    //   // workbench.setActiveWorkspace(currentWorkspace)
    // }
  }

  const renderWorkspace = () => {
    // return <PageDesigner />;
    const tab = tabs.find(tab => tab.id === activeTabKey)
    console.log('tab', tab)
    if (!tab) {
      // 没有找到对应的 tab，可以渲染一个默认的组件或者返回 null。
      return <PageDesigner />;
    }
    return tab.workspaceType === 'domainModel' ? <DomainModelDesigner /> : <PageDesigner />;
  }
  return (
    <div className="main">
      <div className="main-header">
        <div className="main-header-tabs">
          {
            tabs.map((tab, index) => {
              return (
                <div key={index} className={`main-header-tabs-tab ${activeTabKey === tab.id ? 'active' : ''}`} onClick={() => handleTabChange(tab.id)}>tab1</div>
              )
            })
          }
        </div>
        <div className="main-header-actions">
          search
        </div>
      </div>
      {renderWorkspace()}
    </div>

  )
}