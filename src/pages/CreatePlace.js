import React, { useState } from 'react'
import { Header, Container, Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import useDataFetch from '../hooks/fetchData'
import useDataPost from '../hooks/postData'

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

function NewPlace (props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedActivities, setSelectedActivities] = useState([])

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
    setPayload
  ] = useDataPost('http://localhost:9000/places')

  if (submitResult) {
    console.log(submitResult)
    return <Redirect to='/places' />
  }

  const handleSubmit = function async (e) {
    e.preventDefault()
    const payload = { name, description, activities: selectedActivities }
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
            <Form.Field control={Button}>Submit</Form.Field>
          </Container>
          <Header as='h1'>New Place</Header>
          <Message
            error
            header='Error on Submission'
            content={JSON.stringify(submitError)}
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
