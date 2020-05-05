import React, { useState } from 'react'
import { Comment } from 'semantic-ui-react'
import AddComment from './AddComment'

function CommentGroup (props) {
  const [replyId, setReplyId] = useState('')

  return (
    <Comment.Group threaded>
      {props.comments.map(comment => {
        return (
          <Comment key={comment.id}>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>Elliot Fu</Comment.Author>
              <Comment.Metadata>
                <span>Yesterday at 12:30AM</span>
              </Comment.Metadata>
              <Comment.Text>
                <p>{comment.text}</p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={() => setReplyId(comment.id)}>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            {replyId === comment.id &&
              <AddComment
                objectId={props.objectId} parentId={comment.id} forceUpdate={props.forceUpdate}
              />}

            {comment.children &&
              <CommentGroup
                comments={comment.children}
                objectId={props.objectId} forceUpdate={props.forceUpdate}
              />}
          </Comment>
        )
      })}
    </Comment.Group>
  )
}

export default CommentGroup
