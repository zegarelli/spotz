/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import PlaceRouter from '../../routers/PlaceRouter'

import { MemoryRouter } from 'react-router'

jest.mock('../../pages/Places', () => {
  return () => <div data-testid='places' />
})

jest.mock('../../pages/PlaceDetail', () => {
  return () => <div data-testid='placeDetail' />
})

jest.mock('../../pages/EditPlace', () => {
  return () => <div data-testid='EditPlace' />
})

jest.mock('../../pages/CreatePlace', () => {
  return () => <div data-testid='CreatePlace' />
})

describe('PlaceRouter.js', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/admin']}>
        <PlaceRouter />
      </MemoryRouter>)
    const admin = container.querySelector('.PlaceRouter')
    expect(admin).toBeTruthy()
  })
  it('renders the Places on /places', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/places']}>
        <PlaceRouter />
      </MemoryRouter>)
    expect(getByTestId('places')).toBeTruthy()
  })
  it('renders the PlaceDetail on /places/:id', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/places/1234']}>
        <PlaceRouter />
      </MemoryRouter>)
    expect(getByTestId('placeDetail')).toBeTruthy()
  })
  it('renders the EditPlace on /places/:id/edit', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/places/1234/edit']}>
        <PlaceRouter />
      </MemoryRouter>)
    expect(getByTestId('EditPlace')).toBeTruthy()
  })
  it('renders the CreatePlace on /places/new', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/places/new']}>
        <PlaceRouter />
      </MemoryRouter>)
    expect(getByTestId('CreatePlace')).toBeTruthy()
  })
})
