import { useState, useEffect } from 'react'
import { getTokenFromUrl } from '../common/token'

const useSession = () => {
  const [token, setToken] = useState(undefined)
  const [tokenLoading, setTokenLoading] = useState(true)
  const [tokenError, setTokenError] = useState(false)

  useEffect(() => {
    async function getToken () {
      try {
        const token = await getTokenFromUrl()
        setToken(token)
      } catch (err) {
        if (err.message === 'jwt expired') {
          setToken(undefined)
          setTokenLoading(false)
        } else {
          setTokenLoading(false)
          setTokenError(true)
        }
      }
    }

    getToken()
  }, [])

  return [{ token, tokenLoading, tokenError }]
}

export default useSession
