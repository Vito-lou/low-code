import React, { useState } from "react";
import './index.less'

import { PageDesigner } from './PageDesigner'
import { DbDesigner } from './DbDesigner'
export const Main = () => {
  const [activeTab, setActiveTab] = useState('tab1')
  const renderWorkspace = () => {
    return (
      activeTab === 'tab1' ? <PageDesigner /> : <DbDesigner />
    )
  }
  return (
    <div className="main">
      <div className="main-header">
        <div className="main-header-tabs">
          <div className={`main-header-tabs-tab ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')}>tab1</div>
          <div className={`main-header-tabs-tab ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')}>tab2</div>
        </div>
        <div className="main-header-actions">
          search
        </div>
      </div>
      {renderWorkspace()}
    </div>

  )
}