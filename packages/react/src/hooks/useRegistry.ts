import { GlobalRegistry, IDesignerRegistry } from '@lowcode/core';
import { globalThisPolyfill } from '@lowcode/shared';

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
