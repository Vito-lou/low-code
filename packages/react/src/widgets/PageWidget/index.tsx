import React, { useState } from "react";
import { useCssInJs, usePrefix, useWorkbench } from '../../hooks';
import cls from 'classnames';
import { genPageWidgetStyle } from './styles';
import type { RadioChangeEvent } from 'antd';
import { Flex, Radio, Button, Tree } from 'antd';
import { IconWidget, TextWidget } from '../index';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProps, TreeDataNode } from 'antd';
import {
  OutlineTreeWidget,
  HistoryWidget,
} from "../index"
type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;
const { DirectoryTree } = Tree;
const treeData: TreeDataNode[] = [
  {
    title: 'PC端',
    key: 'PC',
    children: [
      {
        title: 'PC端', key: '0-0-0', isLeaf: false,
        children: [
          {
            title: '页面', key: '0-0-0-0',
            children: [
              {
                title: '测试页面1', key: '0-0-0-0-0', isLeaf: false,
              },
              {
                title: '测试页面2', key: '0-0-0-0-2', isLeaf: false,
              }
            ]
          }
        ]
      },
      { title: 'PC端业务组件', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'H5端',
    key: 'H5',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

export const PageWidget: React.FC = () => {
  const workbench = useWorkbench()
  const prefix = usePrefix('pages-tree');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genPageWidgetStyle,
  });
  const [activeKey, setActiveKey] = useState<string>('page');
  const onChange = (e: RadioChangeEvent) => {
    setActiveKey(e.target.value)
    console.log(`radio checked:${e.target.value}`);
  };
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return wrapSSR(
    <div className={cls(prefix, hashId)}>
      <div className={cls(prefix + '-head', hashId)}>
        <Flex vertical gap="middle">
          <Radio.Group onChange={onChange} defaultValue="page" size="small">
            <Radio.Button value="page">页面</Radio.Button>
            <Radio.Button value="outline">大纲树</Radio.Button>
            <Radio.Button value="history">历史记录</Radio.Button>
          </Radio.Group>
        </Flex>
        <div className={cls(prefix + '-head-handle', hashId)}>
          <IconWidget
            tooltip={
              {
                title: <TextWidget>{'搜索'}</TextWidget>,
                placement: 'top',
              }
            }
            infer={'Design'}
          />
          <Button size="small" type="primary" shape="circle" icon={<PlusOutlined />} />
        </div>
      </div>
      <div className={cls(prefix + '-body', hashId)}>
        {
          activeKey === 'page' && <DirectoryTree
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        }
        {
          activeKey === 'outline' && <OutlineTreeWidget />
        }
        {
          activeKey === 'history' && <HistoryWidget />
        }
      </div>
    </div >
  )
}