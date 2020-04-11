import React from 'react'
import ActivityCard from './ActivityCard'
import PropTypes from 'prop-types'
import { Item, Container } from 'semantic-ui-react'

function ActivityContainer (props) {
  return (
    <Container>
      <Item.Group>
        {props.activities.slice().map((activity) => {
          return (
            <ActivityCard
              key={activity.id}
              id={activity.id}
              name={activity.name}
              placeActivities={activity.placeActivities}
            />
          )
        })}
      </Item.Group>
    </Container>
  )
}

ActivityContainer.propTypes = {
  activities: PropTypes.array.isRequired
}

export default ActivityContainer
