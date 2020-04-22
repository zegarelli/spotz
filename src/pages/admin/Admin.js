import React from 'react'
import { Header, Container, Loader, Table } from 'semantic-ui-react'
import useDataFetch from '../../hooks/fetchData'
import getSessionCookie from '../../common/session'

function EditActivity () {
  const [{
    apiResult: users,
    isLoading: usersLoading,
    isError: usersError
  }] = useDataFetch('http://localhost:9000/users')

  return (
    <div className='PlaceDetail'>
      <Container>
        {usersError && <b>Error</b>}
        {!usersError && usersLoading && <Loader active />}
        {!usersError && !usersLoading && users &&
          <>
            <Header as='h1'>Users</Header>

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Created</Table.HeaderCell>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Scopes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {users.slice().map((user) => {
                  return (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.created_at.slice(0, 10)}</Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>Scopes</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </>}
      </Container>
    </div>
  )
}

export default EditActivity
