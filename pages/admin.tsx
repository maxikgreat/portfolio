import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { User, Role } from '@/types/auth0';

interface SecretProps {
  user: User,
  loading: boolean
}

function Admin({ user, loading }: SecretProps) {
  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="Admin">
        <h1 style={{ color: "white" }}>Admin page - {user.name}</h1>
      </BasePage>
    </BaseLayout>
  )
}
// default role guest
export default withAuth<SecretProps>(Admin, Role.admin);