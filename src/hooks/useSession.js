import { useState, useEffect } from 'react'
import { getTokensFromUrl } from '../common/token'
import Cookie from 'js-cookie'

const useSession = () => {
  const [session, setSession] = useState(undefined)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [sessionError, setSessionError] = useState(false)

  useEffect(() => {
    async function getSession () {
      // check if we are already verified
      const sessionString = Cookie.get('session')
      let session
      if (sessionString) {
        session = JSON.parse(sessionString)
      }
      const tokens = getTokensFromUrl()
      if (!session && tokens) {
        setSessionLoading(true)
        try {
          const res = await window.fetch('http://localhost:9000/users/verify', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              ...tokens
            })
          })
          if (!res.ok) {
            setSessionError(true)
          } else {
            const contentType = res.headers.get('content-type')
            const isJson =
                  contentType && contentType.indexOf('application/json') !== -1
            const apiResult = isJson ? await res.json() : { result: await res.text() }
            const session = {
              username: apiResult.username,
              email: apiResult.email,
              verified: apiResult.verified
            }
            Cookie.set('session', session)
            const sessionCookie = JSON.parse(Cookie.get('session'))
            setSession(sessionCookie)
          }
        } catch (err) {
          console.log('error')
          console.log(err)
          setSessionError(true)
        } finally {
          setSessionLoading(false)
        }
      } else {
        setSession(session)
      }
    }
    getSession()
  }, [])

  return [{ session, sessionLoading, sessionError }]
}

export default useSession
