import { useGetUser } from '@/actions/user';
import { Redirect } from '@/components/shared/Redirect';

export function withAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const { data, loading } = useGetUser();

    if (loading) {
      return <h1>Loading ...</h1>;
    }

    return !data 
      ? <Redirect ssr to="/api/v1/login" />
      : <Component user={data} loading={loading} {...props} />
  }
}
