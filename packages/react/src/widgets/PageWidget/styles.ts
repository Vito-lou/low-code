import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genPageWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      [`&-head`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        paddingTop: '8px',
        paddingRight: '8px',
        paddingBottom: '6px',
        paddingLeft: '8px',
        [`&-handle`]: {
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          [`.ant-btn`]: {
            marginLeft: '8px',
          },
        },
        [`&-timestamp`]: {
          fontSize: '10px',
        },
        [`&:hover`]: {
          backgroundColor: '#eee',
        },
        [`&.active`]: {
          backgroundColor: '#eee',
        },
      },
    },
  },
];
