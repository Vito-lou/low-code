import { useContext } from 'react';
import { DesignerLayoutContext } from '../context';
import { IDesignerLayoutContext } from '../types';
import { globalThisPolyfill } from '@lowcode/shared';

export const useLayout = (): IDesignerLayoutContext => {
  const layout = useContext(DesignerLayoutContext);
  return globalThisPolyfill['__DESIGNABLE_LAYOUT__'] || layout;
};
