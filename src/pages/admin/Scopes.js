import React, { useState, useEffect } from 'react'
import { Header, Form, Loader, Button, Icon } from 'semantic-ui-react'
import useDataFetch from '../../hooks/fetchData'
import useDataPut from '../../hooks/putData'

function Scopes () {
  const [scopes, setScopes] = useState([])
  const [submittedIndex, setsubmittedIndex] = useState('')
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

  useEffect(() => {
    if (returnedScopes) {
      setScopes(returnedScopes)
    }
  }, [returnedScopes])

  const handleSubmit = function async (index) {
    setsubmittedIndex(index)
    const scope = scopes[index]
    setUrl(`http://localhost:9000/scopes/${scope.id}`)
    setPayload({
      description: scope.description,
      name: scope.name
    })
  }

  const setScope = function (index, attrib, value) {
    const updatedScopes = scopes.slice()
    updatedScopes[index][attrib] = value
    setScopes(updatedScopes)
  }

  return (
    <div className='Scopes'>
      <Header as='h1'>Scopes</Header>
      {scopesError && <b>Error</b>}
      {!scopesError && scopesLoading && <Loader active />}
      {!scopesError && !scopesLoading && scopes &&
        <>
          <Header>Scopes Again</Header>
          {scopes.map((scope, index) => {
            return (
              <Form key={scope.id} onSubmit={() => handleSubmit(index)}>
                <Form.Group>
                  <Form.Input value={scope.name} width={4} />
                  <Form.Input
                    value={scope.description} width={8}
                    name='description'
                    onChange={e => setScope(index, e.target.name, e.target.value)}
                  />
                  <Form.Field control={Button}>Update</Form.Field>
                  {submitError && submittedIndex === index && <Icon name='x' color='red' />}
                  {!submitError && submitLoading && submittedIndex === index && <Loader active />}
                  {!submitError && !submitLoading && submittedIndex === index && submitResult && <Icon name='check' color='green'/>}
                </Form.Group>
              </Form>
            )
          })}
        </>}
    </div>
  )
}

export default Scopes
