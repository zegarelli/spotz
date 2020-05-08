import React from 'react'
import { Link } from 'react-router-dom'
import { Loader, Container, Button } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import ActivityContainer from '../components/ActivityContainer'
import getSessionCookie from '../common/session'

function Activities () {
  const [{
    apiResult: activities,
    isLoading,
    isError
  }] = useDataFetch('/api/activities')
  const session = getSessionCookie()
  const verified = session && session.verified

  return (
    <div className='Activities'>
      <Container textAlign='right'>
        <Button primary as={Link} to='/activities/new' disabled={!verified}>New</Button>
      </Container>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && activities &&
        <ActivityContainer activities={activities} />}
    </div>
  )
}

export default Activities
