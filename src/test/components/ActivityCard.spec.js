/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Activity from '../../components/ActivityCard'

describe('Activity.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Activity name='name' id='123' created_at='1234' />
      </MemoryRouter>
    )
    expect(getByTestId('activity')).toBeTruthy()
  })
  it('adds the header', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Activity name='name' id='123' created_at='1234' />
      </MemoryRouter>
    )
    expect(getByText('name')).toBeTruthy()
  })
  it('checks props', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue('')
    render(
      <MemoryRouter>
        <Activity created_at={123} />
      </MemoryRouter>
    )
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `name` is marked as required in `ActivityCard`/))
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `id` is marked as required in `ActivityCard`/))
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: Invalid prop `created_at` of type `number` supplied to `ActivityCard`/))
  })
})
