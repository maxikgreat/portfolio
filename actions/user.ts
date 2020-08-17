import useSWR from 'swr';
import axios from 'axios';

import { User } from '@/types/auth0';

const fetcher = (url: string) => axios(url).then(({ data }) => data);

export const useGetUser = () => {
  const { data, error, ...rest } = useSWR<User>('/api/v1/me', fetcher, {
    revalidateOnFocus: true
  });
  if (error) {
    return { data: null, loading: false };
  }
  return { data, error, loading: !data && !error, ...rest };
};