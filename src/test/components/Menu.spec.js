/* global describe, it, expect, jest, beforeEach */

import React from 'react'
import { render } from '@testing-library/react'
import Menu from '../../components/Menu'
import { MemoryRouter } from 'react-router-dom'
import getSessionCookie from '../../common/session'

jest.mock('../../common/session')

beforeEach(function () {
  getSessionCookie.mockImplementation(jest.fn(function () {
    return { verified: false }
  }))
})

describe('Menu.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<MemoryRouter><Menu /></MemoryRouter>)
    expect(getByTestId('menu')).toBeTruthy()
  })
  it('has links to home, places, activities, and events', function () {
    const { container } = render(<MemoryRouter><Menu /></MemoryRouter>)
    const home = container.querySelector('#menu-home')
    expect(home.pathname).toEqual('/')
    const places = container.querySelector('#menu-places')
    expect(places.pathname).toEqual('/places')
    const activities = container.querySelector('#menu-activities')
    expect(activities.pathname).toEqual('/activities')
    const events = container.querySelector('#menu-events')
    expect(events.pathname).toEqual('/places')
  })
  it('has a login button when session is not valid', function () {
    const { container } = render(<MemoryRouter><Menu /></MemoryRouter>)
    const login = container.querySelector('#menu-login')
    expect(login).toBeTruthy()
  })
  it('has logout & profile buttons when the session is valid', function () {
    getSessionCookie.mockImplementation(jest.fn(function () {
      return { verified: true, username: 'martin' }
    }))
    const { container } = render(<MemoryRouter><Menu /></MemoryRouter>)
    const logout = container.querySelector('#menu-logout')
    expect(logout).toBeTruthy()
    const profile = container.querySelector('#menu-profile')
    expect(profile).toBeTruthy()
    expect(profile.text).toEqual('Martin')
    expect(profile.pathname).toEqual('/profile')
  })
})
