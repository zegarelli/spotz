/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import AdminRouter from '../../routers/AdminRouter'

import { MemoryRouter } from 'react-router'

jest.mock('../../pages/admin/Admin', () => {
  return () => <div data-testid='admin' />
})

jest.mock('../../pages/admin/Scopes', () => {
  return () => <div data-testid='scopes' />
})

jest.mock('../../pages/admin/AdminUsers', () => {
  return () => <div data-testid='adminUsers' />
})

jest.mock('../../pages/admin/EditUserScopes', () => {
  return () => <div data-testid='EditUserScopes' />
})

describe('FrontRouter.js', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/admin']}>
        <AdminRouter />
      </MemoryRouter>)
    const admin = container.querySelector('.AdminRouter')
    expect(admin).toBeTruthy()
  })
  it('renders the Admin on /admin', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/admin']}>
        <AdminRouter />
      </MemoryRouter>)
    expect(getByTestId('admin')).toBeTruthy()
  })
  it('renders the Scopes Page on /admin/scopes', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/admin/scopes']}>
        <AdminRouter />
      </MemoryRouter>)
    expect(getByTestId('scopes')).toBeTruthy()
  })
  it('renders the AdminUsers page on /admin/users', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/admin/users']}>
        <AdminRouter />
      </MemoryRouter>)
    expect(getByTestId('adminUsers')).toBeTruthy()
  })
  it('renders the EditUserScopes page on /admin/users/:id', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/admin/users/1234']}>
        <AdminRouter />
      </MemoryRouter>)
    expect(getByTestId('EditUserScopes')).toBeTruthy()
  })
})
