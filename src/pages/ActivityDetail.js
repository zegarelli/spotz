import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader, Header, Grid, Image, Button } from 'semantic-ui-react'

import getSessionCookie from '../common/session'

import PlaceContainer from '../components/PlaceContainer'
import useDataFetch from '../hooks/fetchData'
import CommentThread from '../components/CommentThread'

function formatPlaces (placeActivities) {
  const places = []
  placeActivities.forEach(placeActivity => {
    places.push({
      name: placeActivity.place.name,
      id: placeActivity.place_id,
      extended_data: placeActivity.place.extended_data
    })
  })
  return places
}

function ActivityDetail () {
  const { id } = useParams()
  const [{
    apiResult: activity,
    isLoading,
    isError
  }] = useDataFetch(`http://localhost:9000/activities/${id}`)
  const session = getSessionCookie()
  const verified = session && session.verified

  return (
    <div className='ActivityDetail'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && activity &&
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://spotzstatic.s3.us-east-2.amazonaws.com/bitmoji.png' />
            </Grid.Column>
            <Grid.Column width={11}>
              <Header as='h1'>{activity.name}</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
            </Grid.Column>
            <Grid.Column width={1}>
              <Button primary as={Link} to={`/activities/${id}/edit`} disabled={!verified}>Edit</Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h2'>Places</Header>
              {
                <PlaceContainer places={formatPlaces(activity.placeActivities)} />
              }
            </Grid.Column>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
          </Grid.Row>
        </Grid>}
      <CommentThread objectId={id} />
    </div>
  )
}

export default ActivityDetail
