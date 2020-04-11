import React from 'react'
import { Loader, Item } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import Place from '../components/PlaceCard'

function Places () {
  const [{ apiResult: places, isLoading, isError }] = useDataFetch('http://localhost:9000/places/')

  return (
    <div className='Places'>
      <Item.Group>
        {isError && <b>Error</b>}
        {!isError && isLoading && <Loader active />}
        {!isError && !isLoading && places &&
        places.slice().map((place) => {
          return (
            <Place key={place.id} id={place.id} name={place.name} extended_data={place.extended_data} created_at={place.created_at} placeActivities={place.placeActivities} />
          )
        }
        )}
      </Item.Group>
    </div>
  )
}

export default Places
