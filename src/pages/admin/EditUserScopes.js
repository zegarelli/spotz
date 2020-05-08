import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Container, Loader, Header,
  Divider, Icon, Form, Button,
  Table, Grid, Dimmer
} from 'semantic-ui-react'
import useDataFetch from '../../hooks/fetchData'
import useDataPost from '../../hooks/postData'
import useDataDelete from '../../hooks/deleteData'

function scopesUserDoesntHave (userScopes, allScopes) {
  const newScopes = allScopes.filter(scope => {
    return !(userScopes.find(userScope => userScope.id === scope.id))
  })
  const formattedScopes = []
  for (const scope of newScopes) {
    formattedScopes.push({
      key: scope.id,
      text: scope.name,
      value: scope.id
    })
  }
  return formattedScopes
}

function UserDetail () {
  const [newScope, setNewScope] = useState('')
  const { id } = useParams()
  const [{
    apiResult: user,
    isLoading,
    isError
  }] = useDataFetch(`/api/users/${id}`)

  const [{
    apiResult: scopesOptions,
    isLoading: scopeLoading,
    isError: scopeError
  }] = useDataFetch('/api/scopes')

  const [
    {
      apiResult: addScopeResult,
      isLoading: addScopeLoading,
      isError: addScopeError
    },
    setPostUrl, setPostPayload
  ] = useDataPost('')

  const [
    {
      apiResult: removeScopeResult,
      isLoading: removeScopeLoading,
      isError: removeScopeError
    },
    setDeleteUrl, setDeletePayload
  ] = useDataDelete('')

  const handleNewScope = function () {
    setNewScope({})
  }

  if ((!addScopeError && addScopeResult) || (!removeScopeError && removeScopeResult)) {
    window.location.reload()
  }

  const handleRemoveScope = function (scopeId) {
    setDeleteUrl(`/api/users/${id}/scope`)
    setDeletePayload({
      scopeId
    })
  }

  const handleAddScope = function (scopeId) {
    setPostUrl(`/api/users/${id}/scope`)
    setPostPayload({
      scopeId
    })
  }

  return (
    <div className='EditUserScopes'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading &&
        <Container>
          <Header as='h1'>Username: {user.username}<br />Email: {user.email}</Header>
          <Divider horizontal>
            <Header as='h2'>
              <Icon name='eye slash outline' />
              Scopes
            </Header>
          </Divider>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3} textAlign='center'>Name</Table.HeaderCell>
                <Table.HeaderCell width={5} textAlign='center'>Desciption</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='center'><Button primary disabled={!!newScope} onClick={handleNewScope}>New</Button></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.scopes.map(scope => {
                if (scope.id !== 'new') {
                  return (
                    <Table.Row key={scope.id} textAlign='center'>
                      <Table.Cell>
                        {scope.name}
                      </Table.Cell>
                      <Table.Cell>
                        {scope.description}
                      </Table.Cell>
                      <Table.Cell>
                        <Button size='mini' color='red' onClick={() => handleRemoveScope(scope.id)}>
                          Remove
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                }
                return (undefined)
              })}
            </Table.Body>
          </Table>
          {newScope &&
            <Container>
              <Dimmer active={addScopeLoading || removeScopeLoading}>
                <Loader size='medium'>Loading</Loader>
              </Dimmer>
              <Grid>
                <Grid.Row centered>
                  <Form onSubmit={() => handleAddScope(newScope.id)}>
                    <Form.Group>
                      <Form.Dropdown
                        placeholder='Add Permission Scope'
                        loading={scopeLoading}
                        error={scopeError}
                        options={scopesOptions ? scopesUserDoesntHave(user.scopes, scopesOptions) : []}
                        selection
                        search
                        onChange={(e, data) => {
                          setNewScope({ id: data.value })
                        }}
                        value={newScope.id}
                      />
                      <Form.Field control={Button}>Add</Form.Field>
                    </Form.Group>
                  </Form>
                </Grid.Row>
              </Grid>
            </Container>}

          <Divider horizontal>
            <Header as='h2'>
              <Icon name='building outline' />
              Places
            </Header>
          </Divider>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3} textAlign='center'>Name</Table.HeaderCell>
                <Table.HeaderCell width={5} textAlign='center'>Desciption</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.places.map(place => {
                return (
                  <Table.Row key={place.id} textAlign='center'>
                    <Table.Cell><Link to={`/places/${place.id}`}>{place.name}</Link></Table.Cell>
                    <Table.Cell>{place.extended_data.description}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>

          <Divider horizontal>
            <Header as='h2'>
              <Icon name='beer' />
              Activities
            </Header>
          </Divider>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3} textAlign='center'>Name</Table.HeaderCell>
                <Table.HeaderCell width={5} textAlign='center'>Desciption</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.activities.map(activity => {
                return (
                  <Table.Row key={activity.id} textAlign='center'>
                    <Table.Cell><Link to={`/activities/${activity.id}`}>{activity.name}</Link></Table.Cell>
                    <Table.Cell>{activity.extended_data.description}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Container>}
    </div>
  )
}

export default UserDetail
