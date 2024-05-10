import React, { useEffect, useState, useRef } from 'react';
import { isValid } from '@lowcode/shared';
import { TextWidget, IconWidget } from '../widgets';
import { useCssInJs, usePrefix } from '../hooks';
import cls from 'classnames';
import { genRightPanelStyle } from './styles';

export interface IRightPanelProps {
  children?: React.ReactNode;
  showNavTitle?: boolean;
  showPin?: boolean;
  showClose?: boolean;
  defaultOpen?: boolean;
  defaultPinning?: boolean;
  defaultActiveKey?: number;
  activeKey?: number | string;
  onChange?: (activeKey: number | string) => void;
}

export interface IRightPanelItemProps extends React.PropsWithChildren {
  children?: React.ReactNode;
  shape?: 'tab' | 'button' | 'link';
  title?: React.ReactNode;
  icon?: React.ReactNode;
  key?: number | string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  extra?: React.ReactNode;
}

const parseItems = (
  children: React.ReactNode,
): IRightPanelItemProps[] => {
  const items = [];
  React.Children.forEach(children, (child, index) => {
    if (child?.['type'] === RightPanel.Item) {
      items.push({ key: child['key'] ?? index, ...child['props'] });
    }
  });
  return items;
};

const findItem = (
  items: IRightPanelItemProps[],
  key: string | number,
) => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (key === index) return item;
    if (key === item.key) return item;
  }
};

const getDefaultKey = (children: React.ReactNode) => {
  const items = parseItems(children);
  return items?.[0].key;
};


export const RightPanel: React.FC<IRightPanelProps> & {
  Item: React.FC<IRightPanelItemProps>
} = (props) => {
  const prefix = usePrefix('right-panel');
  const [activeKey, setActiveKey] = useState<string | number>(
    props.defaultActiveKey ?? getDefaultKey(props.children),
  );
  const activeKeyRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const items = parseItems(props.children);
  const currentItem = findItem(items, activeKey);
  const content = currentItem?.children;

  activeKeyRef.current = activeKey;
  useEffect(() => {
    if (isValid(props.activeKey)) {
      if (props.activeKey !== activeKeyRef.current) {
        setActiveKey(props.activeKey);
      }
    }
  }, [props.activeKey]);
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genRightPanelStyle,
  });

  const renderContent = () => {
    if (!content || !visible) return;
    return (
      <div
        className={cls(
          prefix + '-tabs-content',
          hashId,
        )}
      >
        <div className={cls(prefix + '-tabs-body', hashId)}>{content}</div>
      </div>
    );
  };
  if (!visible) {
    return wrapSSR(
      <div
        className={cls(prefix + '-opener', hashId)}
        onClick={() => {
          setVisible(true);
        }}
      >
        <IconWidget infer="Setting" size={20} />
      </div>,
    );
  }

  return wrapSSR(
    <div className={cls(
      prefix, hashId
    )}>
      <div className={cls(prefix + '-header', hashId)}>
        <div className={cls(prefix + '-header-tabs', hashId)}>
          {items.map((item, index) => {
            const takeTab = () => {
              if (item.href) {
                return <a href={item.href}>{item.icon}</a>;
              }
              return (
                <IconWidget
                  tooltip={
                    props.showNavTitle
                      ? null
                      : {
                        title: <TextWidget>{item.title}</TextWidget>,
                      }
                  }
                  infer={item.icon}
                />
              );
            };
            const shape = item.shape ?? 'tab';
            const Comp = shape === 'link' ? 'a' : 'div';
            return (
              <Comp
                className={cls(
                  prefix + '-tabs-pane',
                  {
                    active: activeKey === item.key,
                  },
                  hashId,
                )}
                key={index}
                href={item.href}
                onClick={(e: any) => {
                  if (shape === 'tab') {
                    if (!props?.activeKey || !props?.onChange)
                      setActiveKey(item.key);
                  }
                  item.onClick?.(e);
                  props.onChange?.(item.key);
                }}
              >
                {item.icon && takeTab()}
                {props.showNavTitle && item.title ? (
                  <div className={cls(prefix + '-tabs-pane-title', hashId)}>
                    <TextWidget>{item.title}</TextWidget>
                  </div>
                ) : null}
              </Comp>
            );
          })}
        </div>
        <div className={cls(prefix + '-header-actions', hashId)}>
          <IconWidget
            infer="Close"
            className={prefix + '-header-close'}
            onClick={() => {
              setVisible(false);
            }}
          />
        </div>
      </div>
      {renderContent()}
    </div>
  )
}

RightPanel.Item = () => {
  return <React.Fragment />;
};
