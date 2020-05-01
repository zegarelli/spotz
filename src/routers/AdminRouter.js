import React from 'react'
import { Route } from 'react-router-dom'

import Scopes from '../pages/admin/Scopes'
import AdminUsers from '../pages/admin/AdminUsers'
import EditUserScopes from '../pages/admin/EditUserScopes'
import Admin from '../pages/admin/Admin'

import AdminMenu from '../components/admin/AdminMenu'
import { Grid } from 'semantic-ui-react'
function AdminRouter () {
  return (
    <div className='AdminRouter'>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <AdminMenu />
          </Grid.Column>
          <Grid.Column width={12}>
            <Route
              path='/admin/scopes'
              component={() => <Scopes />}
            />
            <Route
              path='/admin/users/:id'
              component={() => <EditUserScopes />}
            />
            <Route
              exact
              path='/admin/users'
              component={() => <AdminUsers />}
            />
            <Route
              exact
              path='/admin'
              component={() => <Admin />}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default AdminRouter
