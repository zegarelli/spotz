import React, { useState, useEffect } from 'react'
import { Form, Button } from 'semantic-ui-react'
import useDataPost from '../hooks/postData'

function AddComment (props) {
  const [comment, setComment] = useState('')
  const [
    {
      apiResult,
      isLoading,
      isError
    },
    setPostUrl, setPostPayload
  ] = useDataPost('')

  useEffect(() => {
    if (apiResult) {
      props.forceUpdate()
    }
  }, [apiResult, props])

  const handleSubmit = function () {
    if (comment) {
      setPostUrl('http://localhost:9000/comments')
      setPostPayload({
        objectId: props.objectId,
        parentId: props.parentId,
        text: comment
      })
    }
  }
  return (
    <>
      {!apiResult && !isLoading && !isError &&
        <Form reply onSubmit={handleSubmit}>
          <Form.TextArea onChange={e => setComment(e.target.value)} label={props.parentId ? 'Add reply' : 'Add new comment'} />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary disabled={!comment} />
        </Form>}
    </>
  )
}

export default AddComment
