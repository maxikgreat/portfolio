import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { User, Role } from '@/types/auth0';

interface SecretProps {
  user: User,
  loading: boolean
}

function Secret({ user, loading }: SecretProps) {
  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="Secret">
        <h1 style={{ color: "white" }}>Secret page - user: {user.name}</h1>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth<SecretProps>(Secret, Role.admin);