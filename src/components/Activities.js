import React from 'react'
import { Loader, Item } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import { activitiesToItems } from '../utils/maps'

function Activities () {
  const [{ apiResult: activities, isLoading, isError }] = useDataFetch('http://localhost:9000/activities')

  return (
    <div className='Activities'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader />}
      {!isError && !isLoading && activities &&
        <Item.Group items={activitiesToItems(activities)} />}
      <pre>{JSON.stringify(activities, null, 2)}</pre>
    </div>
  )
}

export default Activities
