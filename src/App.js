import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

// pages
import Menu from './components/Menu'

import Home from './pages/Home'

import Places from './pages/Places'
import CreatePlace from './pages/CreatePlace'
import PlaceDetail from './pages/PlaceDetail'
import EditPlace from './pages/EditPlace'

import Activities from './pages/Activities'
import ActivityDetail from './pages/ActivityDetail'
import CreateActivity from './pages/CreateActivity'
import EditActivity from './pages/EditActivity'

// Hooks
import useSession from './hooks/useSession'

function App () {
  useSession()

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
            path='/places/:id/edit'
            component={() => <EditPlace />}
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
            path='/activities/:id/edit'
            component={() => <EditActivity />}
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
