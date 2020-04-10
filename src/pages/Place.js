import React from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'

function Place () {
  const { id } = useParams()
  console.log(id)
  const [{ apiResult: place, isLoading, isError }] = useDataFetch(`http://localhost:9000/places/${id}`)

  return (
    <div className='Place'>
      <h2>Place Details</h2>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && place &&
        <pre>{JSON.stringify(place, null, 2)}</pre>}
    </div>
  )
}

export default Place
