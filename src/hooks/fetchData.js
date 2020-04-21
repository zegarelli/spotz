import { useState, useEffect } from 'react'

const useDataFetch = (initialUrl, initialPayload, initialSkip) => {
  const [url, setUrl] = useState(initialUrl)
  const [payload, setPayload] = useState(initialPayload)
  const [skip] = useState(initialSkip)
  const [apiResult, setApiResult] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(url !== '')

      if (url !== '') {
        try {
          const res = await window.fetch(url, {
            ...payload,
            credentials: 'include'
          })
          if (!res.ok) {
            setIsError(true)
          }
          const apiResult = url !== '' && (await res.json())
          setApiResult(apiResult)
          setIsLoading(false)
        } catch (error) {
          setIsError(true)
        }
      }
    }

    if (skip) {
      setIsLoading(false)
      setIsError(false)
    } else {
      fetchData()
    }

    return () => setIsError(true)
  }, [payload, url, skip])

  return [{ apiResult, isLoading, isError }, setPayload, setUrl]
}

export default useDataFetch
