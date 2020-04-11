import React from 'react'
import { Item, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'

function mapPlaces (placeActivities) {
  const places = []
  placeActivities.forEach(placeActivity => {
    places.push(placeActivity.place.name)
  })
  return places
}

function ActivityCard (props) {
  const places = props.placeActivities ? mapPlaces(props.placeActivities) : undefined

  return (
    <Item data-testid='activity'>
      <Item.Image size='tiny' src='/images/bitmoji.png' />
      <Item.Content>
        <Item.Header>{props.name}</Item.Header>
        <Item.Description>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Item.Description>
        {places &&
          <Item.Extra>{`Places: ${places.join(', ')}`}</Item.Extra>}
      </Item.Content>
    </Item>
  )
}

ActivityCard.propTypes = {
  name: PropTypes.string.isRequired,
  created_at: PropTypes.string
}

export default ActivityCard
