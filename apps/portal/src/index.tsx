import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import App from './App'
import { StoreProvider } from './providers'
import './theme/index.css'
import { mockXHR } from '../mock'
mockXHR()
const root = ReactDom.createRoot(document.getElementById('app') as HTMLElement)
export function RootComponent() {
  return (
    <StoreProvider>
      <App></App>
    </StoreProvider>
  )
}
root.render(<RootComponent />)
