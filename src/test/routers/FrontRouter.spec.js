/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import FrontRouter from '../../routers/FrontRouter'

import { MemoryRouter } from 'react-router'

jest.mock('../../routers/PlaceRouter', () => {
  return () => <div data-testid='placeRouter' />
})

jest.mock('../../routers/ActivityRouter', () => {
  return () => <div data-testid='activityRouter' />
})

jest.mock('../../pages/Home', () => {
  return () => <div data-testid='home' />
})

jest.mock('../../pages/Profile', () => {
  return () => <div data-testid='profile' />
})

describe('FrontRouter.js', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <FrontRouter />
      </MemoryRouter>)
    const router = container.querySelector('.FrontRouter')
    expect(router).toBeTruthy()
  })
  it('renders the Home on /', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <FrontRouter />
      </MemoryRouter>)
    expect(getByTestId('home')).toBeTruthy()
  })
  it('renders the PlaceRouter on /places', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/places']}>
        <FrontRouter />
      </MemoryRouter>)
    expect(getByTestId('placeRouter')).toBeTruthy()
  })
  it('renders the PlaceRouter on /events', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/events']}>
        <FrontRouter />
      </MemoryRouter>)
    expect(getByTestId('placeRouter')).toBeTruthy()
  })
  it('renders the ActivityRouter on /activities', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/activities']}>
        <FrontRouter />
      </MemoryRouter>)
    expect(getByTestId('activityRouter')).toBeTruthy()
  })
  it('renders the Profile page on /profile', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/profile']}>
        <FrontRouter />
      </MemoryRouter>)
    expect(getByTestId('profile')).toBeTruthy()
  })
})
