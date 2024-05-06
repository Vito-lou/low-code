import { createContext } from 'react'
import type { TRootStore } from './store/rootStore'

export const StoresContext = createContext<TRootStore | null>(null)
