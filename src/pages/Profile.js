import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container, Loader, Header,
  Divider, Icon, Table
} from 'semantic-ui-react'

import useDataFetch from '../hooks/fetchData'
import getSessionCookie from '../common/session'

function Profile () {
  const session = getSessionCookie()
  const [{ apiResult: user, isLoading, isError }, , setUrl] = useDataFetch('')

  useEffect(() => {
    if (session && session.verified && session.id) {
      setUrl(`/api/users/${session.id}`)
    }
  }, [setUrl, session])

  return (
    <div className='Profile'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && user &&
        <Container>
          <Header as='h1'>Username: {user.username}<br />Email: {user.email}</Header>

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
                <Table.HeaderCell width={1} textAlign='center'>Spotz</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='center'>Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.places.map(place => {
                return (
                  <Table.Row key={place.id} textAlign='center'>
                    <Table.Cell><Link to={`/places/${place.id}`}>{place.name}</Link></Table.Cell>
                    <Table.Cell>{place.extended_data.description}</Table.Cell>
                    <Table.Cell>{1234}</Table.Cell>
                    <Table.Cell>{place.created_at.split('T')[0]}</Table.Cell>
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
                <Table.HeaderCell width={1} textAlign='center'>Spotz</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='center'>Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.activities.map(activity => {
                return (
                  <Table.Row key={activity.id} textAlign='center'>
                    <Table.Cell><Link to={`/activities/${activity.id}`}>{activity.name}</Link></Table.Cell>
                    <Table.Cell>{activity.extended_data.description}</Table.Cell>
                    <Table.Cell>{1234}</Table.Cell>
                    <Table.Cell>{activity.created_at.split('T')[0]}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Container>}
    </div>
  )
}

export default Profile
