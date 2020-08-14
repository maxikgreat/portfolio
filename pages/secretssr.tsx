import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { User } from '@/types';
import { withAuth } from '@/utils/auth0';

interface SecretSsrProps {
  user: User | null,
}

// generic T - returned type of callback
// additional func for act on backend
// export const getServerSideProps = withAuth<User>(async ({ req, res }, user) => {
  
// });
export const getServerSideProps = withAuth();

export default function SecretSsr({ user }: SecretSsrProps) {
  return (
    <BaseLayout data={user} loading={false}>
      <BasePage>
        <h1 style={{ color: "white" }}>Secret page - {user && user.name}</h1>
      </BasePage>
    </BaseLayout>
  )
}
