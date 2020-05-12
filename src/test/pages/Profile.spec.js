/* global describe, it, expect, jest, beforeEach, afterEach */

import React from 'react'
import { render } from '@testing-library/react'
import Profile from '../../pages/Profile'

import useDataFetch from '../../hooks/fetchData'
import getSessionCookie from '../../common/session'

import { MemoryRouter } from 'react-router'

jest.mock('../../hooks/fetchData')
jest.mock('../../common/session')

let apiResult

beforeEach(function () {
  useDataFetch.mockImplementation(jest.fn(function () {
    apiResult = { places: [], activities: [] }
    return [{ apiResult, isLoading: false, isError: false }]
  }))

  getSessionCookie.mockImplementation(jest.fn(function () {
    return { verified: true }
  }))
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Profile.js', function () {
  it('renders without crashing', function () {
    const { container } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    )
    const places = container.querySelector('.Profile')
    expect(places).toBeTruthy()
  })
  it('doesn\'t get data if the user isn\'t verified', function () {
    useDataFetch.mockImplementation(jest.fn(function (url) {
      if (url) {
        apiResult = { places: [], activities: [] }
        return [{ apiResult, isLoading: false, isError: false }]
      }
      return [{ apiResult: false, isLoading: false, isError: false }]
    }))

    getSessionCookie.mockImplementation(jest.fn(function () {
      return { verified: true }
    }))
    const { container } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    )
    const places = container.querySelector('.Profile')
    expect(places).toBeTruthy()
  })
  it('gets data when the user is verified', function () {
    const setUrlSpy = jest.fn()
    const userId = '1234'

    getSessionCookie.mockImplementation(jest.fn(function () {
      return { verified: true, id: userId }
    }))

    useDataFetch.mockImplementation(jest.fn(function (url) {
      if (url) {
        apiResult = { places: [], activities: [] }
        return [{ apiResult, isLoading: false, isError: false }]
      }
      return [{ apiResult: false, isLoading: false, isError: false }, '', setUrlSpy]
    }))
    const { container } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    )
    const places = container.querySelector('.Profile')
    expect(places).toBeTruthy()
    expect(setUrlSpy.mock.calls[0][0]).toEqual(`/api/users/${userId}`)
  })
  it('displays error on fetchError', function () {
    useDataFetch.mockImplementation(jest.fn(function () {
      return [{ apiResult: false, isLoading: false, isError: true }]
    }))
    const { container } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    )
    const errorText = container.querySelector('b').innerHTML
    expect(errorText).toEqual('Error')
  })
  it('displays loading on fetchLoading', function () {
    useDataFetch.mockImplementation(jest.fn(function () {
      return [{ apiResult: false, isLoading: true, isError: false }]
    }))
    const { container } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    )
    const loader = container.querySelector('.ui.active.loader')
    expect(loader).toBeTruthy()
  })
  describe('places table', function () {
    let profile
    beforeEach(function () {
      apiResult.places = [{
        id: '1234',
        name: 'Cool Place',
        created_at: '2020-01-01T00:00:00.000',
        extended_data: { description: 'Stuff' }
      }]
      useDataFetch.mockImplementation(jest.fn(function () {
        return [{ apiResult, isLoading: false, isError: false }]
      }))
      const { container } = render(
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      )
      profile = container
    })
    it('renders a table of places', function () {
      const table = profile.querySelector('#place-table')
      expect(table).toBeTruthy()
    })
    it('has column headers: Name, Description, Spotz, Created', function () {
      const table = profile.querySelector('#place-table')
      let header = table.querySelector('th')
      expect(header.innerHTML).toEqual('Name')
      header = table.querySelectorAll('th')[1]
      expect(header.innerHTML).toEqual('Description')
      header = table.querySelectorAll('th')[2]
      expect(header.innerHTML).toEqual('Spotz')
      header = table.querySelectorAll('th')[3]
      expect(header.innerHTML).toEqual('Created')
    })
    it('displays place: Name, Description, Spotz, Created in proper columns', function () {
      const table = profile.querySelector('#place-table')
      let header = table.querySelector('td > a')
      expect(header.innerHTML).toEqual('Cool Place')
      header = table.querySelectorAll('td')[1]
      expect(header.innerHTML).toEqual('Stuff')
      header = table.querySelectorAll('td')[2]
      expect(header.innerHTML).toEqual('1234')
      header = table.querySelectorAll('td')[3]
      expect(header.innerHTML).toEqual('January 1st at 0:00')
    })
  })
  describe('activity table', function () {
    let profile
    beforeEach(function () {
      apiResult.activities = [{
        id: '1234',
        name: 'Cool Activity',
        created_at: '2020-01-01T00:00:00.000',
        extended_data: { description: 'Stuff' }
      }]
      useDataFetch.mockImplementation(jest.fn(function () {
        return [{ apiResult, isLoading: false, isError: false }]
      }))
      const { container } = render(
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      )
      profile = container
    })
    it('renders a table of activities', function () {
      const table = profile.querySelector('#activity-table')
      expect(table).toBeTruthy()
    })
    it('has column headers: Name, Description, Spotz, Created', function () {
      const table = profile.querySelector('#activity-table')
      let header = table.querySelector('th')
      expect(header.innerHTML).toEqual('Name')
      header = table.querySelectorAll('th')[1]
      expect(header.innerHTML).toEqual('Description')
      header = table.querySelectorAll('th')[2]
      expect(header.innerHTML).toEqual('Spotz')
      header = table.querySelectorAll('th')[3]
      expect(header.innerHTML).toEqual('Created')
    })
    it('displays place: Name, Description, Spotz, Created in proper columns', function () {
      const table = profile.querySelector('#activity-table')
      let header = table.querySelector('td > a')
      expect(header.innerHTML).toEqual('Cool Activity')
      header = table.querySelectorAll('td')[1]
      expect(header.innerHTML).toEqual('Stuff')
      header = table.querySelectorAll('td')[2]
      expect(header.innerHTML).toEqual('1234')
      header = table.querySelectorAll('td')[3]
      expect(header.innerHTML).toEqual('January 1st at 0:00')
    })
  })
})
