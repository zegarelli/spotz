/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

import { MemoryRouter } from 'react-router'
jest.mock('../routers/AdminRouter', () => {
  const AdminRouter = () => <div data-testid='adminRouter' />
  return AdminRouter
})

jest.mock('../routers/FrontRouter', () => {
  const FrontRouter = () => <div data-testid='frontRouter' />
  return FrontRouter
})

jest.mock('../pages/AuthRedirect', () => {
  const AuthRedirect = () => <div data-testid='authRedirect' />
  return AuthRedirect
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
