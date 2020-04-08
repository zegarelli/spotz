import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Places from './pages/Places'
import Home from './pages/Home'
import Menu from './components/Menu'
import Activities from './pages/Activities'

function App () {
  return (
    <div className='App'>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route
            path='/places'
            component={() => <Places />}
          />
          <Route
            path='/activities'
            component={() => <Activities />}
          />
          <Route
            path='/events'
            component={() => <Places />}
          />
          <Route
            path='/'
            component={() => <Home />}
          />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>,
    </div>
  )
}

export default App
