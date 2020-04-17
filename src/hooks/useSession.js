import { useState, useEffect } from 'react'
import { getTokenFromUrl, getDecodedToken } from '../common/token'

const useSession = () => {
  const [tokenName, setTokenName] = useState(undefined)
  const [token, setToken] = useState(undefined)
  const [tokenLoading, setTokenLoading] = useState(true)
  const [tokenError, setTokenError] = useState(false)

  useEffect(() => {
    async function getToken () {
      if (tokenName) {
        try {
          getTokenFromUrl()
          setToken(await getDecodedToken(tokenName))
        } catch (err) {
          if (err.message === 'jwt expired') {
            setToken(undefined)
            setTokenLoading(false)
          } else {
            console.log(err)
            setTokenLoading(false)
            setTokenError(true)
          }
        }
      }
    }

    getToken()
  }, [tokenName])

  return [{ token, tokenLoading, tokenError }, setTokenName]
}

export default useSession
