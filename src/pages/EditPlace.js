import React, { useState, useEffect } from 'react'
import { Header, Container, Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect, useParams } from 'react-router-dom'
import useDataFetch from '../hooks/fetchData'
import useDataPut from '../hooks/putData'
import getSessionCookie from '../common/session'

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
    activities.push(placeActivity.activity_id)
  })
  return activities
}

function EditPlace () {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedActivities, setSelectedActivities] = useState([])
  const session = getSessionCookie()
  const verified = session && session.verified

  const [{
    apiResult: place,
    isLoading: placeLoading,
    isError: placeError
  }] = useDataFetch(`http://localhost:9000/places/${id}`)

  useEffect(() => {
    if (place) {
      setName(place.name)
      setDescription(place.extended_data.description)
      setSelectedActivities(extractActivityIds(place.placeActivities))
    }
  }, [place])

  const [{
    apiResult: activities,
    isLoading: activitiesLoading,
    isError: activitiesError
  }] = useDataFetch('http://localhost:9000/activities')

  const [
    {
      apiResult: submitResult,
      isLoading: submitLoading,
      isError: submitError
    },
    setUrl,
    setPayload
  ] = useDataPut()

  if (!submitError && submitResult) {
    return <Redirect to={`/places/${submitResult.id}`} />
  }

  const handleSubmit = function async (e) {
    e.preventDefault()
    const payload = { name, description, activities: selectedActivities }
    setUrl(`http://localhost:9000/places/${id}`)
    setPayload(payload)
  }

  return (
    <div className='PlaceDetail'>
      <Container>
        {placeError && <b>Error</b>}
        {!placeError && placeLoading && <Loader active />}
        {!placeError && !placeLoading && place &&
          <>
            <Dimmer active={submitLoading}>
              <Loader size='massive'>Loading</Loader>
            </Dimmer>
            <Form onSubmit={handleSubmit} error={submitError}>
              <Container textAlign='right'>
                <Form.Field control={Button} disabled={!verified}>Submit</Form.Field>
              </Container>
              <Header as='h1'>Edit Place</Header>
              <Message
                error
                header='Error on Submission'
                content='Something went wrong when submitting edits. Please Retry'
              />
              <Form.Input
                fluid label='Place Name' placeholder='Place Name'
                onChange={e => setName(e.target.value)} value={name}
              />
              <Form.TextArea label='Description' placeholder='Tell us more about your new place...' onChange={e => setDescription(e.target.value)} value={description} />
              <Form.Dropdown
                label='Activities'
                placeholder='Activities'
                fluid
                multiple
                search
                selection
                options={activities ? mapActivitiesDropDown(activities) : []}
                loading={activitiesLoading}
                error={activitiesError}
                onChange={(e, data) => {
                  setSelectedActivities(data.value)
                }}
                value={selectedActivities}
              >
              </Form.Dropdown>
            </Form>
          </>}
      </Container>
    </div>
  )
}

export default EditPlace
