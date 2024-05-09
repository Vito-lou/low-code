import React, { useState } from "react";
import './index.less'
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  RightPanel,
  SettingsPanel,
  ComponentTreeWidget,
  PageWidget,
  DataModelWidget,
} from "@lowcode/react"
import {
  ArrayCards,
  ArrayTable,
  Field,
  Form,
  Input,
  NumberPicker,
  Password,
  Rate,
} from '@lowcode/designable-formily-antd';
export const PageDesigner = () => {
  return (
    <Workspace id="form">
      <WorkspacePanel>
        <ToolbarPanel>
          <DesignerToolsWidget />
          <ViewToolsWidget
            use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
          />
        </ToolbarPanel>
        <ViewportPanel style={{ height: '100%' }}>
          <ViewPanel type="DESIGNABLE">
            {() => (
              <ComponentTreeWidget
                components={{
                  Form,
                  Field,
                  Input,
                  Rate,
                  NumberPicker,
                  Password,
                  ArrayCards,
                  ArrayTable,
                }}
              />
            )}
          </ViewPanel>
        </ViewportPanel>
      </WorkspacePanel>
    </Workspace>
  )
}