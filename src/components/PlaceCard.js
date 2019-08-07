import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const PlaceCard = () => (
  <Card>
    <Image src={'../../public/images/bitmoji.jpg'} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Martin</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2019</span>
      </Card.Meta>
      <Card.Description>
        Martin is a developer living in Kansas City.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    </Card.Content>
  </Card>
)

export default PlaceCard
