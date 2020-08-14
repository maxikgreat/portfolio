

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { User } from '@/types';
import { useGetUser } from '@/actions/user';
import { GetServerSideProps, NextApiRequest } from 'next';
import auth0 from '@/utils/auth0';

interface SecretSsrProps {
  user: User | undefined,
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req as NextApiRequest);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/v1/login'
    });
    res.end();
    return {props: {}}
  }

  return {
    props: {
      user: session.user
    }
  }
};

function SecretSsr({ user }: SecretSsrProps) {

  if (user) {
    return (
      <BaseLayout data={user} loading={false}>
        <BasePage>
          <h1 style={{ color: "white" }}>Secret page - {user && user.name}</h1>
        </BasePage>
      </BaseLayout>
    )
  } else return null;
  
}

// export default withAuth<SecretSsrProps>(SecretSsr);
export default SecretSsr;