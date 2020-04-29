import React, { useState } from 'react'
import { Header, Container, Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import useDataFetch from '../hooks/fetchData'
import useDataPost from '../hooks/postData'
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

function NewPlace () {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedActivities, setSelectedActivities] = useState([])
  const session = getSessionCookie()
  const verified = session && session.verified

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
  ] = useDataPost()

  if (!submitError && submitResult) {
    return <Redirect to={`/places/${submitResult.id}`} />
  }

  const handleSubmit = function async (e) {
    e.preventDefault()
    const payload = { name, description, activities: selectedActivities }
    setUrl('http://localhost:9000/places')
    setPayload(payload)
  }

  return (
    <div className='PlaceDetail'>
      <Container>
        <Dimmer active={submitLoading}>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
        <Form onSubmit={handleSubmit} error={submitError}>
          <Container textAlign='right'>
            <Form.Field control={Button} disabled={!verified}>Submit</Form.Field>
          </Container>
          <Header as='h1'>New Place</Header>
          <Message
            error
            header='Error on Submission'
            content={JSON.stringify(submitResult)}
          />
          <Form.Input fluid label='Place Name' placeholder='Place Name' onChange={e => setName(e.target.value)} />
          <Form.TextArea label='Description' placeholder='Tell us more about your new place...' onChange={e => setDescription(e.target.value)} />
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
          >
          </Form.Dropdown>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, description, selectedActivities }, null, 2)}</pre>
      </Container>
    </div>
  )
}

export default NewPlace
