import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Container, Loader, Table, Button } from 'semantic-ui-react'
import useDataFetch from '../../hooks/fetchData'

function AdminUsers () {
  const [{
    apiResult: users,
    isLoading: usersLoading,
    isError: usersError
  }] = useDataFetch('/api/users')

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
                      <Table.Cell>{user.scopes.map(scope => scope.name).join(', ')}</Table.Cell>
                      <Table.Cell>
                        <Button primary as={Link} to={`users/${user.id}`}>Edit</Button>
                      </Table.Cell>
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

export default AdminUsers
