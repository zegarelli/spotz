/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

import { MemoryRouter } from 'react-router'

jest.mock('../routers/AdminRouter', () => {
  return () => <div data-testid='adminRouter' />
})

jest.mock('../routers/FrontRouter', () => {
  return () => <div data-testid='frontRouter' />
})

jest.mock('../pages/AuthRedirect', () => {
  return () => <div data-testid='authRedirect' />
})

describe('App.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>)
    expect(getByTestId('app')).toBeTruthy()
  })
  it('renders the FrontRouter', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>)
    expect(getByTestId('frontRouter')).toBeTruthy()
  })
  it('renders the AdminRouter', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    )
    expect(getByTestId('adminRouter')).toBeTruthy()
  })
  it('renders the AuthRedirect', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/auth']}>
        <App />
      </MemoryRouter>
    )
    expect(getByTestId('authRedirect')).toBeTruthy()
  })
  it('redirect all others to FrontRouter', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/fkjasdhfl']}>
        <App />
      </MemoryRouter>)
    expect(getByTestId('frontRouter')).toBeTruthy()
  })
})
