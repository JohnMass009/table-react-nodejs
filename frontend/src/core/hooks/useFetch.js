import {useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import {baseUrl} from 'consts';

export const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    let skipGetResponseAfterDestroy = false
    if (!isLoading) {
      return;
    }

    const requestOptions = {
      ...options
    }

    axios(baseUrl + url, requestOptions)
      .then(res => {
        if (!skipGetResponseAfterDestroy) {
          setResponse(res.data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        if (!skipGetResponseAfterDestroy) {
          console.log(err);
          setIsLoading(false)
        }
      })
    return () => {
      skipGetResponseAfterDestroy = true
    }
  }, [isLoading, url, options])

  return [response, doFetch]
}