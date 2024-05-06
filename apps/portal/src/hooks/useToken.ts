import { useStore } from "./useStore";

export const useToken = () => {
  const store = useStore();
  return store?.userStore.token;
};
