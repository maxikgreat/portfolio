import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { Redirect } from '@/components/shared/Redirect';
import { User } from '@/types';
import { withAuth } from '@/utils/auth0';
import { NextPage } from 'next';

interface SecretSsrProps {
  user: User | null,
}

export const getServerSideProps = withAuth();


export default function SecretSsr ({ user }: SecretSsrProps) {
  if (!user) {
    return <Redirect ssr to="api/v1/login"/>;
  }
  return (
    <BaseLayout data={user} loading={false}>
      <BasePage>
        <h1 style={{ color: "white" }}>Secret page - {user && user.name}</h1>
      </BasePage>
    </BaseLayout>
  )
}
