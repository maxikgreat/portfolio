import { User, Role } from '@/types/auth0';
import { withAuth } from '@/components/hoc/withAuth';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';

interface WorkEditProps {
  user: User,
  loading: boolean,
}

function WorkEdit({ user, loading }: WorkEditProps) {
  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="Edit work">
        
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(WorkEdit, Role.admin);
