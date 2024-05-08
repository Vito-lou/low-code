import React, { useState } from "react";
import { useCssInJs, usePrefix, useWorkbench } from '../../hooks';
import cls from 'classnames';
import { genDataModelWidgetStyle } from './styles';
import { Button, Tree } from 'antd';
import { IconWidget, TextWidget } from '../index';
import { PlusOutlined } from '@ant-design/icons';
import type { GetProps, TreeDataNode } from 'antd';
type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;
const { DirectoryTree } = Tree;
const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

export const DataModelWidget: React.FC = () => {
  const prefix = usePrefix('pages-tree');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genDataModelWidgetStyle,
  });
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };
  return wrapSSR(
    <div className={cls(prefix, hashId)}>
      <div className={cls(prefix + '-head', hashId)}>
        <TextWidget>数据</TextWidget>
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
        <DirectoryTree
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
        />

      </div>
    </div >
  )
}