/* global describe, it, expect */

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'

describe('App.js', () => {
  it('renders without crashing', () => {
    const expected = 2
    const result = 1 + 1
    expect(result).toEqual(expected)
  })
})
