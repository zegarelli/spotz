import React from 'react'
import { Item, Image } from 'semantic-ui-react'

function Activity (activity) {
  return (
    <Item>
      <Item.Image size='tiny' src='/images/bitmoji.png' />
      <Item.Content>
        <Item.Header>{activity.name}</Item.Header>
        <Item.Description>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Description>{`${activity.name} at place ${activity.place_id}`}</Item.Description>
        <Item.Extra>{`Created At: ${activity.created_at}`}</Item.Extra>
      </Item.Content>
    </Item>

  )
}

export default Activity
