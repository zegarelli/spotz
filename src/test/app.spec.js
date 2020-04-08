/* global describe, it, expect */

import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

describe('App.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('app')).toBeTruthy()
  })
})
