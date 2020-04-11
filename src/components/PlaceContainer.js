import React from 'react'
import PlaceCard from './PlaceCard'
import PropTypes from 'prop-types'
import { Item, Container } from 'semantic-ui-react'

function PlaceContainer (props) {
  return (
    <Container>
      <Item.Group>
        {props.places.slice().map((place) => {
          return (
            <PlaceCard
              key={place.id}
              id={place.id}
              name={place.name}
              extended_data={place.extended_data} created_at={place.created_at}
              placeActivities={place.placeActivities}
            />
          )
        })}
      </Item.Group>
    </Container>
  )
}

PlaceContainer.propTypes = {
  places: PropTypes.array.isRequired
}

export default PlaceContainer
