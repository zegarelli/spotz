/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import ActivityRouter from '../../routers/ActivityRouter'

import { MemoryRouter } from 'react-router'

jest.mock('../../pages/Activities', () => {
  return () => <div data-testid='Activities' />
})

jest.mock('../../pages/ActivityDetail', () => {
  return () => <div data-testid='ActivityDetail' />
})

jest.mock('../../pages/EditActivity', () => {
  return () => <div data-testid='EditActivity' />
})

jest.mock('../../pages/CreateActivity', () => {
  return () => <div data-testid='CreateActivity' />
})

describe('ActivityRouter.js', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['']}>
        <ActivityRouter />
      </MemoryRouter>)
    const admin = container.querySelector('.ActivityRouter')
    expect(admin).toBeTruthy()
  })
  it('renders the Activities on /activities', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/activities']}>
        <ActivityRouter />
      </MemoryRouter>)
    expect(getByTestId('Activities')).toBeTruthy()
  })
  it('renders the ActivityDetail on /activities/:id', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/activities/1234']}>
        <ActivityRouter />
      </MemoryRouter>)
    expect(getByTestId('ActivityDetail')).toBeTruthy()
  })
  it('renders the EditActivity on /activities/:id/edit', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/activities/1234/edit']}>
        <ActivityRouter />
      </MemoryRouter>)
    expect(getByTestId('EditActivity')).toBeTruthy()
  })
  it('renders the CreateActivity on /activities/new', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/activities/new']}>
        <ActivityRouter />
      </MemoryRouter>)
    expect(getByTestId('CreateActivity')).toBeTruthy()
  })
})
