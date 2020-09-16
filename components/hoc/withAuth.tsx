import { useGetUser } from '@/actions/user';
import { Redirect } from '@/components/shared/Redirect';
import { Role } from '@/types/auth0';
import { rolePassed } from '@/utils/auth0';
import { Loader } from '@/components/shared/Loader';

export function withAuth<T>(Component: React.ComponentType<T>, role = Role.guest) {
  return (props: T) => {
    const { data, loading } = useGetUser();

    if (loading) {
      return <Loader />;
    }

    return !data 
      ? <Redirect ssr to="/api/v1/login" />
      : !rolePassed(data, role) 
        ? <Redirect ssr to="/api/v1/login" />
        : <Component user={data} loading={loading} {...props} />
  }
}
