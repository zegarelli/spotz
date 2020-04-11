import React from 'react'
import { Loader } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import ActivityContainer from '../components/ActivityContainer'

function Activities () {
  const [{ apiResult: activities, isLoading, isError }] = useDataFetch('http://localhost:9000/activities')

  return (
    <div className='Activities'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && activities &&
        <ActivityContainer activities={activities} />}
    </div>
  )
}

export default Activities
