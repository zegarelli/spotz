import { useState, useEffect } from 'react'

export const useDataPut = (initialUrl, initialPayload) => {
  const [url] = useState(initialUrl)
  const [payload, setPayload] = useState(initialPayload)
  const [apiResult, setApiResult] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(payload)

      if (payload) {
        try {
          const res = await window.fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              ...payload
            })
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

    fetchData()
  }, [payload, url])

  return [{ apiResult, isLoading, isError }, setPayload]
}
