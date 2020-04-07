import React from 'react'
import { Loader, Item } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import { activitiesToItems } from '../utils/maps'

const items = [
  {
    childKey: 0,
    image: '/images/wireframe/image.png',
    header: 'Header',
    description: 'Description',
    meta: 'Metadata',
    extra: 'Extra'
  },
  {
    childKey: 1,
    image: '/images/wireframe/image.png',
    header: 'Header',
    description: 'Description',
    meta: 'Metadata',
    extra: 'Extra'
  }
]

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
