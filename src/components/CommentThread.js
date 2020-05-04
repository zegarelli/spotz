import React from 'react'
import { Header, Container, Loader } from 'semantic-ui-react'

import CommentGroup from './CommentGroup'
import useDataFetch from '../hooks/fetchData'
import AddComment from './AddComment'

function CommentThread (props) {
  const [{
    apiResult: comments,
    isLoading,
    isError
  }] = useDataFetch(`http://localhost:9000/comments?objectId=${props.objectId}`)
  return (
    <Container>
      <Header as='h3' dividing>
    Comments
      </Header>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading &&
        <>
          <CommentGroup comments={comments} objectId={props.objectId} />
          <AddComment objectId={props.objectId} />
        </>}
    </Container>
  )
}

export default CommentThread
