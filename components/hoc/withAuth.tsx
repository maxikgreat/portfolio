import { useGetUser } from '@/actions/user';
import { Redirect } from '@/components/shared/Redirect';
import { Role } from '@/types/auth0';
import { rolePassed } from '@/utils/auth0';

export function withAuth<T>(Component: React.ComponentType<T>, role = Role.guest) {
  return (props: T) => {
    const { data, loading } = useGetUser();

    if (loading) {
      return <h1>Loading ...</h1>;
    }

    return !data 
      ? <Redirect ssr to="/api/v1/login" />
      : !rolePassed(data, role) 
        ? <Redirect ssr to="/api/v1/login" />
        : <Component user={data} loading={loading} {...props} />
  }
}
