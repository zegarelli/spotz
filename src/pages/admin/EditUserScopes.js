import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Loader } from 'semantic-ui-react'
import useDataFetch from '../../hooks/fetchData'

function UserDetail () {
  const { id } = useParams()
  const [{
    apiResult: user,
    isLoading,
    isError
  }] = useDataFetch(`http://localhost:9000/users/${id}`)
  return (
    <div className='EditUserScopes'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading &&
        <Container>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Container>}
    </div>
  )
}

export default UserDetail
