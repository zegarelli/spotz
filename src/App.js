import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Places from './pages/Places'
import PlaceDetail from './pages/PlaceDetail'
import CreatePlace from './pages/CreatePlace'
import Home from './pages/Home'
import Menu from './components/Menu'
import Activities from './pages/Activities'
import ActivityDetail from './pages/ActivityDetail'
import CreateActivity from './pages/CreateActivity'

function App () {
  return (
    <div className='App' data-testid='app'>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route
            path='/places/new'
            component={() => <CreatePlace />}
          />
          <Route
            path='/places/:id'
            component={() => <PlaceDetail />}
          />
          <Route
            path='/places'
            component={() => <Places />}
          />
          <Route
            path='/activities/new'
            component={() => <CreateActivity />}
          />
          <Route
            path='/activities/:id'
            component={() => <ActivityDetail />}
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
      </BrowserRouter>
    </div>
  )
}

export default App
