import { useContext } from 'react'
import { StoresContext } from '../context'

export const useStore = () => useContext(StoresContext)
