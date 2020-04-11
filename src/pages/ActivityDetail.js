import React from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Header, Grid, Image } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import PlaceContainer from '../components/PlaceContainer'

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

function ActivityDetail (props) {
  const { id } = useParams()
  const [{ apiResult: activity, isLoading, isError }] = useDataFetch(`http://localhost:9000/activities/${id}`)

  return (
    <div className='ActivityDetail'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && activity &&
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='/images/bitmoji.png' />
            </Grid.Column>
            <Grid.Column width={13}>
              <Header as='h1'>{activity.name}</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
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
    </div>
  )
}

export default ActivityDetail
