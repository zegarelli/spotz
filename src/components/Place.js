import React from 'react'
import { Item } from 'semantic-ui-react'
import PropTypes from 'prop-types'

function Place (props) {
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
  return (
    <Item
      data-testid='place'
    >
      <Item.Image size='small' src={imagePath} />
      <Item.Content>
        <Item.Header>{props.name}</Item.Header>
        <Item.Description>{description}</Item.Description>
        <Item.Meta>{`Opens: ${opens} Closes: ${closes}`}</Item.Meta>
        <Item.Extra>{`Created At: ${props.created_at}`}</Item.Extra>
      </Item.Content>
    </Item>
  )
}

Place.propTypes = {
  name: PropTypes.string.isRequired,
  created_at: PropTypes.string,
  extended_data: PropTypes.object.isRequired
}

export default Place
