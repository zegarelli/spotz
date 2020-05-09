/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import Places from '../../pages/Places'

import PlaceContainer from '../../components/PlaceContainer'

import { MemoryRouter } from 'react-router'

jest.mock('../../hooks/fetchData', function useDataFetch () {
  return () => {
    const apiResult = [{}, {}]
    const result = [{ apiResult, isLoading: false, isError: false }]
    return result
  }
})

jest.mock('../../components/PlaceContainer', () => {
  return jest.fn(({ children, ...rest }) => (
    <div className='PlaceContainer' {...rest}>
      {typeof children === 'function' ? '[Child as a function]' : children}
    </div>
  ))
})

describe('Places.js', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Places />
      </MemoryRouter>
    )
    const places = container.querySelector('.Places')
    expect(places).toBeTruthy()
  })
  it('renders PlaceContainer & passes places', () => {
    const { container, debug } = render(
      <MemoryRouter>
        <Places />
      </MemoryRouter>
    )
    const places = container.querySelector('.PlaceContainer')
    expect(places).toBeTruthy()
    expect(PlaceContainer).toHaveBeenCalledWith({ places: [{}, {}] }, {})
    debug()
  })
})
