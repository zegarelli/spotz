import React from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import Profile from '../pages/Profile'

import PlaceRouter from './PlaceRouter'
import ActivityRouter from './ActivityRouter'

import Menu from '../components/Menu'

function FrontRouter () {
  return (
    <div className='FrontRouter'>
      <Menu />
      <Route
        path='/places'
        component={() => <PlaceRouter />}
      />
      <Route
        path='/activities'
        component={() => <ActivityRouter />}
      />
      <Route
        exact
        path='/events'
        component={() => <PlaceRouter />}
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
