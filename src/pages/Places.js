import React from 'react'
import { Loader, Item, Button, Container } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import PlaceContainer from '../components/PlaceContainer'
import { Link } from 'react-router-dom'

function Places () {
  const [{ apiResult: places, isLoading, isError }] = useDataFetch('http://localhost:9000/places/')

  return (
    <div className='Places'>
      <Container textAlign='right'>
        <Button primary as={Link} to='/places/new'>New</Button>
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
