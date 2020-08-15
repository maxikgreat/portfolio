import { User } from '@/types/index';
import useSWR from 'swr';
import axios from 'axios';

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