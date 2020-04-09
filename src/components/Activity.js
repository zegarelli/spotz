import React from 'react'
import { Item, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'

function Activity (props) {
  return (
    <Item data-testid='activity'>
      <Item.Image size='tiny' src='/images/bitmoji.png' />
      <Item.Content>
        <Item.Header>{props.name}</Item.Header>
        <Item.Description>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Description>{`${props.name} at place ${props.place_id}`}</Item.Description>
        <Item.Extra>{`Created At: ${props.created_at}`}</Item.Extra>
      </Item.Content>
    </Item>
  )
}

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  place_id: PropTypes.number.isRequired,
  created_at: PropTypes.string
}

export default Activity
