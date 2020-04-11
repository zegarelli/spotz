/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import Activity from '../../components/Activity'

describe('Activity.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Activity name='name' place_id={1} created_at='1234' />)
    expect(getByTestId('activity')).toBeTruthy()
  })
  it('adds the header', () => {
    const { getByText } = render(<Activity name='name' place_id={1} created_at='1234' />)
    expect(getByText('name')).toBeTruthy()
  })
  it('adds the description', () => {
    const name = 'Buzzard Beach'
    const placeId = 12345
    const { getByText } = render(<Activity name={name} place_id={placeId} created_at='1234' />)
    expect(getByText(`${name} at place ${placeId}`)).toBeTruthy()
  })
  it('adds the extra', () => {
    const created = '1234'
    const { getByText } = render(<Activity name='name' place_id={1} created_at={created} />)
    expect(getByText(`Created At: ${created}`)).toBeTruthy()
  })
  it('checks props', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue('')
    render(<Activity created_at={123} />)
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `name` is marked as required in `Activity`/))
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `place_id` is marked as required in `Activity`/))
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: Invalid prop `created_at` of type `number` supplied to `Activity`/))
  })
})
