import React, { useState } from 'react'
import { Comment } from 'semantic-ui-react'
import AddComment from './AddComment'

import { formatDate } from '../common/dateFormatter'
const defaultProfilePic = 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg'

function CommentGroup (props) {
  const [replyId, setReplyId] = useState('')

  return (
    <Comment.Group threaded>
      {props.comments.map(comment => {
        const user = comment.user || { username: 'unknown user', extended_data: { profilePic: defaultProfilePic } }
        return (
          <Comment key={comment.id}>
            <Comment.Avatar as='a' src={user.extended_data && user.extended_data.profilePic ? user.extended_data.profilePic : defaultProfilePic} />
            <Comment.Content>
              <Comment.Author as='a'>{user.username}</Comment.Author>
              <Comment.Metadata>
                <span>{formatDate(comment.created_at)}</span>
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
