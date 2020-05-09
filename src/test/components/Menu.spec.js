/* global describe, it, expect */

import React from 'react'
import { render } from '@testing-library/react'
import Menu from '../../components/Menu'
import { MemoryRouter } from 'react-router-dom'

describe('Menu.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<MemoryRouter><Menu /></MemoryRouter>)
    expect(getByTestId('menu')).toBeTruthy()
  })
})
