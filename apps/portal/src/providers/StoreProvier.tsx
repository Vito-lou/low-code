import type { ReactNode } from 'react'
import React from 'react'
import { useLocalObservable } from 'mobx-react-lite'
import store from '@/store'
import { StoresContext } from '@/context'

interface StoreProvierProps {
  children: ReactNode
}
export const StoreProvider: React.FC<StoreProvierProps> = (props) => {
  // const rootStore = useLocalObservable(() => store)
  return <StoresContext.Provider value={store}>{props.children}</StoresContext.Provider>
}
