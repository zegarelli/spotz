import { useState, useEffect } from 'react'

const useDataPut = (initialUrl, initialPayload) => {
  const [url] = useState(initialUrl)
  const [payload, setPayload] = useState(initialPayload)
  const [apiResult, setApiResult] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(!!payload)

      if (payload) {
        try {
          setIsLoading(true)
          const res = await window.fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              ...payload
            }),
            credentials: 'include'
          })
          if (!res.ok) {
            setIsError(true)
          }
          let apiResult = url !== ''
          if (apiResult) {
            const contentType = res.headers.get('content-type')
            const isJson =
              contentType && contentType.indexOf('application/json') !== -1
            apiResult = isJson ? await res.json() : { result: await res.text() }
          }
          setApiResult(apiResult)
        } catch (error) {
          setIsError(true)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [payload, url])

  return [{ apiResult, isLoading, isError }, setPayload]
}

export default useDataPut
