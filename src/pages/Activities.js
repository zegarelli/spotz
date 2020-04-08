import React from 'react'
import { Loader, Item } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import Activity from '../components/Activity'

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
            <Activity key={activity.id} activity />
          )
        }
        )}
      </Item.Group>
    </div>
  )
}

export default Activities
