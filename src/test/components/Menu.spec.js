/* global describe, it, expect */

import React from 'react'
import { render } from '@testing-library/react'
import Menu from '../../components/Menu'
import { BrowserRouter } from 'react-router-dom'

describe('Menu.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<BrowserRouter><Menu /></BrowserRouter>)
    expect(getByTestId('menu')).toBeTruthy()
  })
})
