/* global describe, it, expect */

import React from 'react'
import { render } from '@testing-library/react'
import Place from '../../components/Place'

describe('Place.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Place name='name' extended_data={{ description: 'test' }} created_at='1234' />)
    expect(getByTestId('place')).toBeTruthy()
  })
  it('adds the header', () => {
    const { getByText } = render(<Place name='name' extended_data={{ description: 'test' }} created_at='1234' />)
    expect(getByText('name')).toBeTruthy()
  })
  it('adds the description', () => {
    const { getByText } = render(<Place name='name' extended_data={{ description: 'test' }} created_at='1234' />)
    expect(getByText('test')).toBeTruthy()
  })
  it('adds the meta', () => {
    const extendedData = { opens: 'test', closes: 'test' }
    const { getByText } = render(<Place name='name' extended_data={extendedData} created_at='1234' />)
    expect(getByText(`Opens: ${extendedData.opens} Closes: ${extendedData.closes}`)).toBeTruthy()
  })
})
