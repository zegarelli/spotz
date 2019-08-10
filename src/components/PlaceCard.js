import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const PlaceCard = (props) => (
  <Card>
    {/* <Image src={props.imgPath} wrapped ui={false} /> */}
    <img src={props.imgPath} title={props.name}/>
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2019</span>
      </Card.Meta>
      <Card.Description>
        {props.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    </Card.Content>
  </Card>
)

PlaceCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgPath: PropTypes.string
}

export default PlaceCard
