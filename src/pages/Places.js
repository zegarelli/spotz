import React from 'react'
import { Loader, Item, Button, Container } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import PlaceContainer from '../components/PlaceContainer'
import { Link } from 'react-router-dom'
import getSessionCookie from '../common/session'

function Places () {
  const [{ apiResult: places, isLoading, isError }] = useDataFetch('/places')
  const session = getSessionCookie()
  const verified = session && session.verified

  return (
    <div className='Places'>
      <Container textAlign='right'>
        <Button primary as={Link} to='/api/places/new' disabled={!verified}>New</Button>
      </Container>
      <Item.Group>
        {isError && <b>Error</b>}
        {!isError && isLoading && <Loader active />}
        {!isError && !isLoading && places &&
          <PlaceContainer places={places} />}
      </Item.Group>
    </div>
  )
}

export default Places
