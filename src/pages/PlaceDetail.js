import React from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Header, Grid, Image } from 'semantic-ui-react'
import useDataFetch from '../hooks/fetchData'

function PlaceDetail () {
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
            <Grid.Column width={13}>
              <Header as='h1'>{place.name}</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h2'>Activities</Header>
              {}
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
