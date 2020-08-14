import { User } from '@/types/index';
import useSWR, { responseInterface } from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios(url).then(({ data }) => data);

export const useGetUser = () => {
  const { data, error, ...rest } = useSWR<User>('/api/v1/me', fetcher);
  return { data, error, loading: !data && !error, ...rest };
};