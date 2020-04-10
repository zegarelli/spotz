import React from 'react'
import { Loader, Item } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import Place from '../components/Place'

function Places2 () {
  const [{ apiResult: places, isLoading, isError }] = useDataFetch('http://localhost:9000/places/')

  return (
    <div className='Places'>
      <Item.Group>
        {isError && <b>Error</b>}
        {!isError && isLoading && <Loader active />}
        {!isError && !isLoading && places &&
        places.slice().map((place) => {
          return (
            <Place key={place.id} name={place.name} extended_data={place.extended_data} created_at={place.created_at} activities={place.activities} />
          )
        }
        )}
      </Item.Group>
    </div>
  )
}

export default Places2
