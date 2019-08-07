import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const PlaceCard = (props) => (
  <Card>
    <Image src={props.imgPath} wrapped ui={false} />
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

PlaceCard.propTypes = {
  imgPath: PropTypes.string.isRequired
}

export default PlaceCard
