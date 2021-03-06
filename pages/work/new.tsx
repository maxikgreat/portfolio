import { Redirect } from '@/components/shared/Redirect';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { WorkForm } from '@/components/shared/WorkForm';
import { Role, User } from '@/types/auth0';
import { useCreateWork } from '@/actions/work';
import { toast } from 'react-toastify';
import { IWorkPrepared } from '@/types/models';

interface WorkNewProps {
  user: User,
  loading: boolean,
}

function WorkNew({ user, loading }: WorkNewProps) {
  const [createWork, workState] = useCreateWork();

  const createWorkHandler = async (data: IWorkPrepared) => {
    await createWork(data);
    toast('Created successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-message image-bordered-shadow-small",
      bodyClassName: "toast-message-body special-text-small",
      progressClassName: 'toast-message-progress'
    });
  }

  if (workState.data) return <Redirect to="/work" ssr={false} />

  return (
    <BaseLayout data={user} loading={loading} title="Work">
      <BasePage title="New work" className="work-form-container">
        <WorkForm
          onSubmitAction={createWorkHandler}
          onSubmitText="Add"
          error={workState.error}
          loading={workState.loading}
        />
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth<WorkNewProps>(WorkNew, Role.admin)
