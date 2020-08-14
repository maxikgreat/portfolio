import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { User } from '@/types';

interface SecretProps {
  user: User,
  loading: boolean
}

function Secret({ user, loading }: SecretProps) {
  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage>
        <h1 style={{ color: "white" }}>Secret page - {user.name}</h1>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth<SecretProps>(Secret);