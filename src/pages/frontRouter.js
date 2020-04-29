import React from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'

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
        exact
        path='/'
        component={() => <Home />}
      />
    </div>
  )
}

export default FrontRouter