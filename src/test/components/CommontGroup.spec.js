/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import CommentGroup from '../../components/CommentGroup'

describe('Activity.js', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <CommentGroup comments={[]} />
    )
    const result = container.querySelector('.ui.threaded.comments')
    expect(result).toBeTruthy()
  })
  it('renders a single comment', () => {
    const comments = [
      {
        id: '123',
        created_at: '2019-01-01T00:00:00.000'
      }
    ]
    const { getByText, debug } = render(
      <CommentGroup comments={comments} />
    )
    const result = getByText('January 1st, 2019 at 0:00')
    expect(result).toBeTruthy()
  })
  it('uses a default user when the user is unknown', () => {
    const comments = [
      {
        id: '123',
        created_at: '2019-01-01T00:00:00.000'
      }
    ]
    const { getByText, container } = render(
      <CommentGroup comments={comments} />
    )
    const result = getByText('unknown user')
    expect(result).toBeTruthy()
    const imagePath = container.querySelector('.avatar > img')
    expect(imagePath.src).toEqual('https://react.semantic-ui.com/images/avatar/small/elliot.jpg')
  })
  it('uses the provided user', () => {
    const user = {
      username: 'martin',
      extended_data: { profilePic: 'http://localhost/bitmoji.jpg' }
    }
    const comments = [
      {
        id: '123',
        created_at: '2019-01-01T00:00:00.000',
        user
      }
    ]
    const { getByText, container } = render(
      <CommentGroup comments={comments} />
    )
    const result = getByText(user.username)
    expect(result).toBeTruthy()
    const imagePath = container.querySelector('.avatar > img')
    expect(imagePath.src).toEqual(user.extended_data.profilePic)
  })
})
