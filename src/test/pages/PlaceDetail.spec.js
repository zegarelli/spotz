/* global describe, it, expect, jest, beforeEach, afterEach */

import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import PlaceDetail from '../../pages/PlaceDetail'
import useDataFetch from '../../hooks/fetchData'
import CommentThread from '../../components/CommentThread'

jest.mock('../../hooks/fetchData')
jest.mock('../../components/CommentThread')

beforeEach(function () {
  useDataFetch.mockImplementation(jest.fn(function () {
    const apiResult = { id: '123', extended_data: {}, name: 'test', placeActivities: [] }
    const result = [{ apiResult, isLoading: false, isError: false }]
    return result
  }))

  CommentThread.mockImplementation(jest.fn(function () {
    return (<div className='CommentThread' />)
  }))
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Places.js', function () {
  it('renders without crashing', function () {
    const { container } = render(
      <MemoryRouter>
        <PlaceDetail />
      </MemoryRouter>
    )
    const placeDetail = container.querySelector('.PlaceDetail')
    expect(placeDetail).toBeTruthy()
  })
})
