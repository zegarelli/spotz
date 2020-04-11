import React from 'react'
import { Loader, Item } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import Activity from '../components/ActivityCard'

function Activities () {
  const [{ apiResult: activities, isLoading, isError }] = useDataFetch('http://localhost:9000/activities')

  return (
    <div className='Activities'>
      <Item.Group>
        {isError && <b>Error</b>}
        {!isError && isLoading && <Loader active />}
        {!isError && !isLoading && activities &&
        activities.slice().map((activity) => {
          return (
            <Activity key={activity.id} name={activity.name} created_at={activity.created_at} placeActivities={activity.placeActivities} />
          )
        }
        )}
      </Item.Group>
    </div>
  )
}

export default Activities
