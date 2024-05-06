import * as React from 'react'
import './index.less'
import AuthGuard from './router/authGuard';
import { BrowserRouter } from 'react-router-dom';
import Router from '@/router';
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthGuard>
        <Router />
      </AuthGuard>
    </BrowserRouter>


  )
}
export default App
