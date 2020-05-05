import React, { useState, useEffect } from 'react'
import { Header, Container, Loader } from 'semantic-ui-react'

import CommentGroup from './CommentGroup'
import useDataFetch from '../hooks/fetchData'
import AddComment from './AddComment'

function CommentThread (props) {
  const [{
    apiResult: comments,
    isLoading,
    isError
  }, , setUrl] = useDataFetch('')
  const [value, setValue] = useState(false)

  useEffect(() => {
    if (comments && !value) {
      setUrl('')
    }
    if (!comments || value) {
      setUrl(`http://localhost:9000/comments?objectId=${props.objectId}`)
    }
  }, [value, comments, setUrl, props.objectId])

  const forceUpdate = function () {
    setValue(true)
  }

  return (
    <Container>
      <Header as='h3' dividing>
    Comments
      </Header>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && comments &&
        <>
          <CommentGroup comments={comments} objectId={props.objectId} forceUpdate={forceUpdate} />
          <AddComment objectId={props.objectId} forceUpdate={forceUpdate} />
        </>}
    </Container>
  )
}

export default CommentThread
