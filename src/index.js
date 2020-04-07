import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Places from './components/Places'
import Home from './components/Home'
import Menu from './components/Menu'
import Activities from './components/Activities'

ReactDOM.render(
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
  document.getElementById('root')
)
