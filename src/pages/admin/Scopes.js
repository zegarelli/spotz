import React, { useState, useEffect } from 'react'
import { Header, Form, Loader, Button, Icon } from 'semantic-ui-react'
import useDataFetch from '../../hooks/fetchData'
import useDataPut from '../../hooks/putData'
import useDataPost from '../../hooks/postData'

function Scopes () {
  const [scopes, setScopes] = useState([])
  const [submittedIndex, setSubmittedIndex] = useState('')
  const [{
    apiResult: returnedScopes,
    scopesLoading,
    scopesError
  }] = useDataFetch('http://localhost:9000/scopes')

  const [
    {
      apiResult: submitResult,
      isLoading: submitLoading,
      isError: submitError
    },
    setUrl, setPayload
  ] = useDataPut('')

  const [
    {
      apiResult: createResult,
      isLoading: createLoading,
      isError: createError
    },
    setPostUrl, setPostPayload
  ] = useDataPost('')

  if (!createError && createResult) {
    window.location.reload()
  }

  useEffect(() => {
    if (returnedScopes) {
      setScopes(returnedScopes)
    }
  }, [returnedScopes])

  const handleSubmit = function async (index) {
    setSubmittedIndex(index)
    const scope = scopes[index]
    if (scope.id === 'new') {
      setPostUrl('http://localhost:9000/scopes')
      setPostPayload({
        description: scope.description,
        name: scope.name
      })
    } else {
      setUrl(`http://localhost:9000/scopes/${scope.id}`)
      setPayload({
        description: scope.description,
        name: scope.name
      })
    }
  }

  const setScope = function (index, attrib, value) {
    const updatedScopes = scopes.slice()
    updatedScopes[index][attrib] = value
    setScopes(updatedScopes)
  }

  const handleNewScope = function () {
    const updatedScopes = scopes.slice()
    updatedScopes.push({ id: 'new', name: '', description: '' })
    setScopes(updatedScopes)
  }

  return (
    <div className='Scopes'>
      <Header as='h1'>Scopes</Header>
      {scopesError && <b>Error</b>}
      {!scopesError && scopesLoading && <Loader active />}
      {!scopesError && !scopesLoading && scopes &&
        <>
          {scopes.map((scope, index) => {
            return (
              <Form key={scope.id} onSubmit={() => handleSubmit(index)}>
                <Form.Group>
                  <Form.Input
                    value={scope.name} width={4}
                    name='name'
                    onChange={e => setScope(index, e.target.name, e.target.value)}
                  />
                  <Form.Input
                    value={scope.description} width={8}
                    name='description'
                    onChange={e => setScope(index, e.target.name, e.target.value)}
                  />
                  {scope.id !== 'new'
                    ? (
                      <>
                        <Form.Field control={Button}>Update</Form.Field>
                        {submitError && submittedIndex === index && <Icon name='x' color='red' />}
                        {!submitError && submitLoading && submittedIndex === index && <Loader active />}
                        {!submitError && !submitLoading && submittedIndex === index && submitResult && <Icon name='check' color='green' />}
                      </>
                    )
                    : (
                      <>
                        <Form.Field control={Button}>Create</Form.Field>
                        {createError && submittedIndex === index && <Icon name='x' color='red' />}
                        {!createError && createLoading && submittedIndex === index && <Loader active />}
                        {!createError && !createLoading && submittedIndex === index && createResult && <Icon name='check' color='green' />}
                      </>
                    )}
                </Form.Group>
              </Form>
            )
          })}
          <Button onClick={handleNewScope}>New Scope</Button>
        </>}
    </div>
  )
}

export default Scopes
