import React, { useState } from 'react'
import { Header, Container, Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import useDataFetch from '../hooks/fetchData'
import useDataPost from '../hooks/postData'
import getSessionCookie from '../common/session'

function mapPlacesDropDown (activities) {
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

function CreateActivity (props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedPlaces, setSelectedPlaces] = useState([])
  const session = getSessionCookie()
  const verified = session && session.verified

  const [{
    apiResult: places,
    isLoading: placesLoading,
    isError: placesError
  }] = useDataFetch('/api/places')

  const [
    {
      apiResult: submitResult,
      isLoading: submitLoading,
      isError: submitError
    },
    setUrl,
    setPayload
  ] = useDataPost()

  if (submitResult) {
    return <Redirect to={`/activities/${submitResult.id}`} />
  }

  const handleSubmit = function async (e) {
    e.preventDefault()
    const payload = { name, description, places: selectedPlaces }
    setUrl('/api/activities')
    setPayload(payload)
  }

  return (
    <div className='CreateActivity'>
      <Container>
        <Dimmer active={submitLoading}>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
        <Form onSubmit={handleSubmit} error={submitError}>
          <Container textAlign='right'>
            <Form.Field control={Button} disabled={!verified}>Submit</Form.Field>
          </Container>
          <Header as='h1'>New Activity</Header>
          <Message
            error
            header='Error on Submission'
            content={JSON.stringify(submitError)}
          />
          <Form.Input fluid label='Activity Name' placeholder='Activity Name' onChange={e => setName(e.target.value)} />
          <Form.TextArea label='Description' placeholder='Tell us more about your new activity...' onChange={e => setDescription(e.target.value)} />
          <Form.Dropdown
            label='Places'
            placeholder='Places'
            fluid
            multiple
            search
            selection
            options={places ? mapPlacesDropDown(places) : []}
            loading={placesLoading}
            error={placesError}
            onChange={(e, data) => {
              setSelectedPlaces(data.value)
            }}
          >
          </Form.Dropdown>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, description, selectedPlaces }, null, 2)}</pre>
      </Container>
    </div>
  )
}

export default CreateActivity
