/* global describe, it, expect */

import React from 'react'
import { render } from '@testing-library/react'
import Home from '../../pages/Home'

describe('Home.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <Home />
    )
    expect(getByTestId('home')).toBeTruthy()
  })
  it('adds the header', () => {
    const { getByText } = render(
      <Home />
    )
    expect(getByText('Spotz Home')).toBeTruthy()
  })
})
