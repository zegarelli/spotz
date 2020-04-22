import { useEffect } from 'react'
import { getTokensFromUrl } from '../common/token'
import Cookie from 'js-cookie'
import getSessionCookie from '../common/session'

const useSession = () => {
  useEffect(() => {
    async function getSession () {
      // check if we are already verified
      const session = getSessionCookie()
      const tokens = getTokensFromUrl()
      if (!session && tokens) {
        try {
          const res = await window.fetch('http://localhost:9000/users/verify', {
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
              verified: apiResult.verified
            }
            Cookie.set('session', session)
          }
        } catch (err) {
          console.log('error')
          console.log(err)
        }
      }
    }
    getSession()
  }, [])
}

export default useSession
