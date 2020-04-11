import React from 'react'
import { Item } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function mapActivities (placeActivities) {
  const activities = []
  placeActivities.forEach(placeActivity => {
    activities.push(placeActivity.activity.name)
  })
  return activities
}

function PlaceCard (props) {
  let imagePath = ''
  let opens = '8:00 AM'
  let closes = '5:00 PM'
  let description = 'No description provided'
  if (props.extended_data) {
    imagePath = props.extended_data.imagePath || imagePath
    opens = props.extended_data.opens || opens
    closes = props.extended_data.closes || closes
    description = props.extended_data.description || description
  }

  const activities = props.placeActivities ? mapActivities(props.placeActivities) : undefined

  return (
    <Item
      data-testid='place'
    >
      <Item.Image size='small' src={imagePath} />
      <Item.Content>
        <Item.Header as={Link} to={`/places/${props.id}`}>{props.name}</Item.Header>
        <Item.Description>{description}</Item.Description>
        <Item.Meta>{`Opens: ${opens} Closes: ${closes}`}</Item.Meta>
        {activities && <Item.Extra>{`Activities: ${activities.join(', ')}`}</Item.Extra>}
      </Item.Content>
    </Item>
  )
}

PlaceCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  created_at: PropTypes.string,
  extended_data: PropTypes.object.isRequired,
  activities: PropTypes.array
}

export default PlaceCard
