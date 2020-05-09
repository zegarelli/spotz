/* global describe, it, expect, jest, beforeEach, afterEach */

import React from 'react'
import { render } from '@testing-library/react'
import Places from '../../pages/Places'

import PlaceContainer from '../../components/PlaceContainer'
import useDataFetch from '../../hooks/fetchData'
import getSessionCookie from '../../common/session'

import { MemoryRouter } from 'react-router'

jest.mock('../../hooks/fetchData')
jest.mock('../../components/PlaceContainer')
jest.mock('../../common/session')

beforeEach(function () {
  PlaceContainer.mockImplementation(jest.fn(({ children, ...rest }) => (
    <div className='PlaceContainer' {...rest}>
      {typeof children === 'function' ? '[Child as a function]' : children}
    </div>
  )))

  useDataFetch.mockImplementation(jest.fn(function () {
    const apiResult = [{}, {}]
    const result = [{ apiResult, isLoading: false, isError: false }]
    return result
  }))

  getSessionCookie.mockImplementation(jest.fn(function () {
    return { verified: true }
  }))
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Places.js', function () {
  it('renders without crashing', function () {
    const { container } = render(
      <MemoryRouter>
        <Places />
      </MemoryRouter>
    )
    const places = container.querySelector('.Places')
    expect(places).toBeTruthy()
  })
  describe('handles all api responses', function () {
    describe('on Api Result', function () {
      it('renders PlaceContainer & passes places', function () {
        const { container } = render(
          <MemoryRouter>
            <Places />
          </MemoryRouter>
        )
        const places = container.querySelector('.PlaceContainer')
        expect(places).toBeTruthy()
        expect(PlaceContainer).toHaveBeenCalledTimes(1)
        const PlaceContainerArgs = PlaceContainer.mock.calls[0][0]
        expect(PlaceContainerArgs).toEqual({ places: [{}, {}] })
      })
    })
    describe('on Error', function () {
      beforeEach(function () {
        useDataFetch.mockImplementation(jest.fn(function () {
          return [{ apiResult: false, isLoading: false, isError: true }]
        }))
      })
      it('renders PlaceContainer & passes places', function () {
        const { getByText } = render(
          <MemoryRouter>
            <Places />
          </MemoryRouter>
        )
        const error = getByText('Error')
        expect(error).toBeTruthy()
      })
    })
    describe('on Loading', function () {
      beforeEach(function () {
        useDataFetch.mockImplementation(jest.fn(function () {
          return [{ apiResult: false, isLoading: true, isError: false }]
        }))
      })
      it('renders PlaceContainer & passes places', function () {
        const { container } = render(
          <MemoryRouter>
            <Places />
          </MemoryRouter>
        )
        const loader = container.querySelector('.loader')
        expect(loader).toBeTruthy()
      })
    })
  })
  describe('it handles no session', function () {
    it('New button is active when session is valid', function () {
      const { container } = render(
        <MemoryRouter>
          <Places />
        </MemoryRouter>
      )
      const button = container.querySelector('a.primary.button')
      expect(button).toBeTruthy()
    })
    it('New button is active when session is valid', function () {
      getSessionCookie.mockImplementation(jest.fn(function () {
        return { verified: false }
      }))

      const { container } = render(
        <MemoryRouter>
          <Places />
        </MemoryRouter>
      )
      const button = container.querySelector('a.primary.button.disabled')
      expect(button).toBeTruthy()
    })
  })
})
