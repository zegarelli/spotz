import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Places from './components/Places'
import Home from './components/Home'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path='/places'
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
