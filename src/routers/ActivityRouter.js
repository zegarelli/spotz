import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Activities from '../pages/Activities'
import ActivityDetail from '../pages/ActivityDetail'
import CreateActivity from '../pages/CreateActivity'
import EditActivity from '../pages/EditActivity'

function ActivityRouter () {
  return (
    <div className='ActivityRouter'>
      <Switch>
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
          exact
          path='/activities'
          component={() => <Activities />}
        />
      </Switch>
    </div>
  )
}

export default ActivityRouter
