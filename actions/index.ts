import { AxiosPromise } from 'axios';
import { useState } from 'react';

export function useApiHandler<T, K>(apiCall: (data?: T, id?: string) => AxiosPromise<K>): [
  (data?: T, id?: string) => Promise<void>,
  { loading: boolean, error: string, data: K | null }
] {
  const [requestState, setRequestState] = useState<{ loading: boolean, error: string, data: K | null }>({
    loading: false,
    error: '',
    data: null,
  });

  const handler = async (data?: T, id?: string) => {
    setRequestState({ error: '', loading: true, data: null });
    try {
      const response = await apiCall(data, id);
      setRequestState({ error: '', loading: false, data: response.data });
    } catch ({ response }) {
      setRequestState({
        error: (response && response.data) || 'Ooops, something went wrong!',
        loading: false,
        data: null,
      });
    }
  }
  return [handler, {...requestState}];
}
