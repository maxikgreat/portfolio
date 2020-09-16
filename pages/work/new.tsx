import { Redirect } from '@/components/shared/Redirect';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { WorkForm } from '@/components/shared/WorkForm';
import { Role, User } from '@/types/auth0';
import { useCreateWork } from '@/actions/work';

interface WorkNewProps {
  user: User,
  loading: boolean,
}

function WorkNew({ user, loading }: WorkNewProps) {
  const [createWork, workState] = useCreateWork();

  if (workState.data) return <Redirect to="/work" ssr={false} />

  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="New work" className="work-form-container">
        <WorkForm
          onSubmitAction={createWork}
          error={workState.error}
          loading={workState.loading}
        />
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth<WorkNewProps>(WorkNew, Role.admin)
