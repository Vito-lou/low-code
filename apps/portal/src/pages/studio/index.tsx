import React, { useMemo, useEffect } from "react";
import {
  createDesigner, GlobalRegistry,
  KeyCode,
  Shortcut,
} from "@lowcode/core"

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
import { SettingsForm } from '@lowcode/designable-react-settings-form';
import { transformToSchema } from '@lowcode/designable-formily-transformer';
import { Button } from 'antd';
import { Main } from './main'
const App = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              console.log(
                JSON.stringify(engine.getCurrentTree()),
              );
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );
  const handleSave = () => {
    console.log(JSON.stringify(transformToSchema(engine.getCurrentTree())));
  };
  useEffect(() => {
    GlobalRegistry.setDesignerLanguage('zh-cn');
  }, []);

  return (
    <Designer engine={engine}>
      <StudioPanel actions={[<Button onClick={handleSave}>保存</Button>]}>
        <CompositePanel showNavTitle>
          <CompositePanel.Item title="panels.Page" icon="Outline">
            <PageWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.Db" icon="Outline">
            <DataModelWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.Logic" icon="Outline">
            逻辑
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.Workflow" icon="Outline">
            工作流
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[Input, Password, NumberPicker, Rate]}
            />
            <ResourceWidget title="sources.Layouts" sources={[]} />
            <ResourceWidget
              title="sources.Arrays"
              sources={[ArrayCards, ArrayTable]}
            />
            {/*<ResourceWidget title="sources.Displays" sources={[Text]} />*/}
          </CompositePanel.Item>
        </CompositePanel>
        <Main></Main>
        {/* <Tabs size="small" defaultActiveKey="1" items={items} onChange={onChange} /> */}
        {/* <Workspace id="form">
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
        <Workspace id="form2">
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
        </Workspace> */}
        <RightPanel showNavTitle>
          <RightPanel.Item title="panels.PropertySettings">
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </RightPanel.Item>
          <RightPanel.Item title="panels.Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[Input, Password, NumberPicker, Rate]}
            />
            <ResourceWidget title="sources.Layouts" sources={[]} />
            <ResourceWidget
              title="sources.Arrays"
              sources={[ArrayCards, ArrayTable]}
            />
          </RightPanel.Item>
        </RightPanel>
        {/* <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel> */}
      </StudioPanel>
    </Designer>

  )
}

export default App;