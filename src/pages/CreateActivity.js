import React, { useState } from 'react'
import { Header, Container, Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import useDataFetch from '../hooks/fetchData'
import useDataPost from '../hooks/postData'

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
  ] = useDataPost('http://localhost:9000/activities')

  if (submitResult) {
    console.log(submitResult)
    return <Redirect to='/activities' />
  }

  const handleSubmit = function async (e) {
    e.preventDefault()
    const payload = { name, description, places: selectedPlaces }
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
            <Form.Field control={Button}>Submit</Form.Field>
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
