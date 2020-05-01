import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Profile from './Profile'

import Places from './Places'
import CreatePlace from './CreatePlace'
import PlaceDetail from './PlaceDetail'
import EditPlace from './EditPlace'

import Activities from './Activities'
import ActivityDetail from './ActivityDetail'
import CreateActivity from './CreateActivity'
import EditActivity from './EditActivity'

import Menu from '../components/Menu'

function FrontRouter () {
  return (
    <div className='FrontRouter'>
      <Menu />
      <Route
        path='/places/new'
        component={() => <CreatePlace />}
      />
      <Route
        path='/places/:id/edit'
        component={() => <EditPlace />}
      />
      <Route
        exact
        path='/places/:id'
        component={() => <PlaceDetail />}
      />
      <Route
        exact
        path='/places'
        component={() => <Places />}
      />
      <Route
        exact
        path='/activities/new'
        component={() => <CreateActivity />}
      />
      <Route
        exact
        path='/activities/:id/edit'
        component={() => <EditActivity />}
      />
      <Route
        exact
        path='/activities/:id'
        component={() => <ActivityDetail />}
      />
      <Route
        exact
        path='/activities'
        component={() => <Activities />}
      />
      <Route
        exact
        path='/events'
        component={() => <Places />}
      />
      <Route
        exact
        path='/profile'
        component={() => <Profile />}
      />
      <Route
        exact
        path='/'
        component={() => <Home />}
      />
    </div>
  )
}

export default FrontRouter
