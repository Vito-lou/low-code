import React, { ReactNode } from 'react';
import { observer } from '@formily/reactive-react';
import { usePrefix, useToken } from '@lowcode/react';
import cls from 'classnames';

// import './styles.less'

export interface IHeaderProps {
  extra: ReactNode | null;
  title: ReactNode | string;
}

export const Header: React.FC<IHeaderProps> = observer(({ extra, title }) => {
  const prefix = usePrefix('data-source-setter');
  const { hashId } = useToken();
  return (
    <div className={cls(`${prefix + '-layout-item-header'}`, hashId)}>
      <div className={cls(`${prefix + '-layout-item-title'}`, hashId)}>
        {title}
      </div>
      {extra}
    </div>
  );
});
