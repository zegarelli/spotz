import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader, Header, Grid, Image, Button } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'
import ActivityContainer from '../components/ActivityContainer'

function formatActivities (placeActivities) {
  const activities = []
  placeActivities.forEach(placeActivity => {
    activities.push({
      name: placeActivity.activity.name,
      id: placeActivity.activity_id
    })
  })
  return activities
}

function PlaceDetail (props) {
  const { id } = useParams()
  const [{ apiResult: place, isLoading, isError }] = useDataFetch(`http://localhost:9000/places/${id}`)

  return (
    <div className='PlaceDetail'>
      {isError && <b>Error</b>}
      {!isError && isLoading && <Loader active />}
      {!isError && !isLoading && place &&
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src={place.extended_data.imagePath} />
            </Grid.Column>
            <Grid.Column width={11}>
              <Header as='h1'>{place.name}</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
            </Grid.Column>
            <Grid.Column width={1}>
              <Button primary as={Link} to={`/places/${id}/edit`}>Edit</Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h2'>Activities</Header>
              {
                <ActivityContainer activities={formatActivities(place.placeActivities)} />
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

export default PlaceDetail
