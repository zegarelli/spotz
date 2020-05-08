import { useEffect, useState } from 'react'
import { getTokensFromUrl } from '../common/token'
import Cookie from 'js-cookie'
import getSessionCookie from '../common/session'

const useSession = () => {
  const [sessionResult, setSessionResult] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    async function getSession () {
      // check if we are already verified
      const session = getSessionCookie()
      const tokens = getTokensFromUrl()
      if (!session && tokens) {
        setIsLoading(true)
        try {
          const baseUrl = window.location.origin.toString() === 'http://localhost:3000' ? 'http://localhost:9000' : window.location.origin.toString()
          const res = await window.fetch(`${baseUrl}/api/users/verify`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              ...tokens
            })
          })
          if (res.ok) {
            const contentType = res.headers.get('content-type')
            const isJson =
                  contentType && contentType.indexOf('application/json') !== -1
            const apiResult = isJson ? await res.json() : { result: await res.text() }
            const session = {
              username: apiResult.username,
              email: apiResult.email,
              verified: apiResult.verified,
              id: apiResult.id
            }
            Cookie.set('session', session)
            setSessionResult(true)
          } else {
            setIsError(true)
          }
        } catch (err) {
          setIsError(true)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsError(true)
        setIsLoading(false)
      }
    }
    getSession()
  }, [])
  return { sessionResult, isLoading, isError }
}

export default useSession
