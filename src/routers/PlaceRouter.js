import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Places from '../pages/Places'
import CreatePlace from '../pages/CreatePlace'
import PlaceDetail from '../pages/PlaceDetail'
import EditPlace from '../pages/EditPlace'

function PlaceRouter () {
  return (
    <div className='FrontRouter'>
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
          exact
          path='/places'
          component={() => <Places />}
        />
      </Switch>
    </div>
  )
}

export default PlaceRouter
