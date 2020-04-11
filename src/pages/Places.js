import React from 'react'
import { Loader, Item } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import PlaceContainer from '../components/PlaceContainer'

function Places () {
  const [{ apiResult: places, isLoading, isError }] = useDataFetch('http://localhost:9000/places/')

  return (
    <div className='Places'>
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
