import axios, { AxiosPromise } from 'axios';
import { useState } from 'react';

export function useApiHandler<T, K>(apiCall: (data?: T) => AxiosPromise<K>): [
  (data: T) => Promise<void>,
  { loading: boolean, error: string, data: K | null }
] {
  const [requestState, setRequestState] = useState<{ loading: boolean, error: string, data: K | null }>({
    loading: false,
    error: '',
    data: null,
  });

  const handler = async (data?: T) => {
    setRequestState({ error: '', loading: false, data: null });
    try {
      const response = await apiCall(data);
      setRequestState({ error: '', loading: false, data: response.data });
    } catch (e) {
      setRequestState({
        error: (e.response && e.response) || 'Ooops, something went wrong!',
        loading: false,
        data: null,
      })
    }
  }
  return [handler, {...requestState}];
}