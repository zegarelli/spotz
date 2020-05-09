/* global describe, it, expect, jest */

import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Place from '../../components/PlaceCard'

describe('Place.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Place id='1234' name='name' extended_data={{ description: 'test' }} created_at='1234' />
      </MemoryRouter>
    )
    expect(getByTestId('place')).toBeTruthy()
  })
  it('adds the header', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Place id='1234' name='name' extended_data={{ description: 'test' }} created_at='1234' />
      </MemoryRouter>
    )
    expect(getByText('name')).toBeTruthy()
  })
  it('adds the description', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Place id='1234' name='name' extended_data={{ description: 'test' }} created_at='1234' />
      </MemoryRouter>
    )
    expect(getByText('test')).toBeTruthy()
  })
  it('adds the meta', () => {
    const extendedData = { opens: 'test', closes: 'test' }
    const { getByText } = render(
      <MemoryRouter>
        <Place id='1234' name='name' extended_data={extendedData} created_at='1234' />
      </MemoryRouter>
    )
    expect(getByText(`Opens: ${extendedData.opens} Closes: ${extendedData.closes}`)).toBeTruthy()
  })
  it('checks props', () => {
    const spy = jest.spyOn(console, 'error').mockReturnValue('')
    render(
      <MemoryRouter>
        <Place id='1234' created_at={123} />
      </MemoryRouter>)
    expect(spy).toHaveBeenCalledTimes(3)
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `name` is marked as required in `PlaceCard`/))
    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Failed prop type: The prop `extended_data` is marked as required in `PlaceCard`/))
  })
})
