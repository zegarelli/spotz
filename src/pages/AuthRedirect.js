import React from 'react'
import { Header, Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import getSessionCookie from '../common/session'

// Hooks
import useSession from '../hooks/useSession'

function AuthRedirect () {
  const {
    sessionResult,
    isLoading,
    isError
  } = useSession()
  const session = getSessionCookie()

  if ((!isError && sessionResult) || session) {
    return <Redirect to='/' />
  }

  return (
    <div className='AuthRedirect'>
      <Container>
        {isError && (
          <>
            <Header as='h1'>Something went wrong</Header>
            Please try logging in
          </>
        )}
        {!isError && isLoading && (
          <>
            <Header as='h1'>Thank you for logging in</Header>
            you should be redirected soon
          </>
        )}
      </Container>
    </div>
  )
}

export default AuthRedirect
