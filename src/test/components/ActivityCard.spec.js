/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Activity from '../../components/ActivityCard'

describe('Activity.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Activity name='name' id='123' created_at='1234' />
      </BrowserRouter>
    )
    expect(getByTestId('activity')).toBeTruthy()
  })
  it('adds the header', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Activity name='name' id='123' created_at='1234' />
      </BrowserRouter>
    )
    expect(getByText('name')).toBeTruthy()
  })
  it('checks props', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue('')
    render(
      <BrowserRouter>
        <Activity created_at={123} />
      </BrowserRouter>
    )
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `name` is marked as required in `ActivityCard`/))
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `id` is marked as required in `ActivityCard`/))
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: Invalid prop `created_at` of type `number` supplied to `ActivityCard`/))
  })
})
