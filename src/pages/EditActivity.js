import React, { useState, useEffect } from 'react'
import { Header, Container, Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect, useParams } from 'react-router-dom'
import useDataFetch from '../hooks/fetchData'
import useDataPut from '../hooks/putData'

function mapActivitiesDropDown (activities) {
  const options = []
  activities.forEach(activity => {
    options.push({
      key: activity.id,
      text: activity.name,
      value: activity.id
    })
  })
  return options
}

function extractActivityIds (placeActivities) {
  const activities = []
  placeActivities.forEach(placeActivity => {
    activities.push(placeActivity.place_id)
  })
  return activities
}

function EditActivity (props) {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedPlaces, setSelectedPlaces] = useState([])

  const [{
    apiResult: activity,
    isLoading: activityLoading,
    isError: activityError
  }] = useDataFetch(`http://localhost:9000/activities/${id}`)

  useEffect(() => {
    if (activity) {
      setName(activity.name)
      setDescription(activity.extended_data ? activity.extended_data.description : '')
      setSelectedPlaces(extractActivityIds(activity.placeActivities))
    }
  }, [activity])

  const [{
    apiResult: places,
    isLoading: placesLoading,
    isError: placesError
  }] = useDataFetch('http://localhost:9000/places')

  const [
    {
      apiResult: submitResult,
      isLoading: submitLoading,
      isError: submitError
    },
    setPayload
  ] = useDataPut(`http://localhost:9000/activities/${id}`)

  if (submitResult) {
    return <Redirect to={`/activities/${submitResult.id}`} />
  }

  const handleSubmit = function async (e) {
    e.preventDefault()
    const payload = { name, description, places: selectedPlaces }
    setPayload(payload)
  }

  return (
    <div className='PlaceDetail'>
      <Container>
        {activityError && <b>Error</b>}
        {!activityError && activityLoading && <Loader active />}
        {!activityError && !activityLoading && activity &&
          <>
            <Dimmer active={submitLoading}>
              <Loader size='massive'>Loading</Loader>
            </Dimmer>
            <Form onSubmit={handleSubmit} error={submitError}>
              <Container textAlign='right'>
                <Form.Field control={Button}>Submit</Form.Field>
              </Container>
              <Header as='h1'>Edit Activity</Header>
              <Message
                error
                header='Error on Submission'
                content='Something went wrong when submitting edits. Please Retry'
              />
              <Form.Input fluid label='Activity Name' placeholder='Activity Name' onChange={e => setName(e.target.value)} value={name} />
              <Form.TextArea label='Description' placeholder='Tell us more about your new activity...' onChange={e => setDescription(e.target.value)} value={description} />
              <Form.Dropdown
                label='Places'
                placeholder='Places'
                fluid
                multiple
                search
                selection
                options={places ? mapActivitiesDropDown(places) : []}
                loading={placesLoading}
                error={placesError}
                onChange={(e, data) => {
                  setSelectedPlaces(data.value)
                }}
                value={selectedPlaces}
              >
              </Form.Dropdown>
            </Form>
          </>}
      </Container>
    </div>
  )
}

export default EditActivity
