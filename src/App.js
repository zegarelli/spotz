import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import AdminRouter from './pages/admin/AdminRouter'
import FrontRouter from './pages/frontRouter'

import AuthRedirect from './pages/AuthRedirect'

function App () {

  return (
    <div className='App' data-testid='app'>
      <BrowserRouter>
        <Switch>
          <Route
            path='/auth'
            component={() => <AuthRedirect />}
          />
          <Route
            path='/admin'
            component={() => <AdminRouter />}
          />
          <Route
            path='/'
            component={() => <FrontRouter />}
          />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
