import React from 'react'
import { Item } from 'semantic-ui-react'
import PropTypes from 'prop-types'

function Place (props) {
  return (
    <Item
      data-testid='place'
    >
      <Item.Image size='small' src={props.extended_data.imagePath} />
      <Item.Content>
        <Item.Header>{props.name}</Item.Header>
        <Item.Description>
          {props.extended_data.description}
        </Item.Description>
        <Item.Meta>{`Opens: ${props.extended_data.opens} Closes: ${props.extended_data.closes}`}</Item.Meta>
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
