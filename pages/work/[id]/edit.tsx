import { NextPageContext } from 'next';

import Work from '@/models/Work';
import { IWork } from '@/types/models';
import { User, Role } from '@/types/auth0';
import { withAuth } from '@/components/hoc/withAuth';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { ErrorPage } from '@/components/shared/ErrorPage';
import { WorkForm } from '@/components/shared/WorkForm';
import { Redirect } from '@/components/shared/Redirect';
import { useUpdateWork } from '@/actions/work';
import { toast } from 'react-toastify';

interface WorkEditProps {
  user: User,
  loading: boolean,
  work: IWork | null,
  error?: string,
}

interface ContextWithId extends NextPageContext {
  query: {
    id: string,
  }
}

export const getServerSideProps = async ({ query: { id }}: ContextWithId) => {
  try {
    const { data } = await new Work().getById(id);
    return { props: { work: data } };
  } catch (e) {
    return { 
      props: { 
        work: null, 
        error: (e.response && e.response.data) || 'Internal server error',
      }
    };
  }
};

function WorkEdit({ user, loading, work, error }: WorkEditProps) {

  const [updateWork, workState] = useUpdateWork();

  const updateWorkHandler = async (data: IWork, id: string) => {
    await updateWork(data, id);
    toast('Updated successfully!', {
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

  if (!work || error) {
    return (
      <BaseLayout data={null} loading={false} title="Work" className="error">
        <ErrorPage message={error} />
      </BaseLayout>
    ) 
  }

  if (workState.data) return <Redirect to="/work" ssr={false} />

  return (
    <BaseLayout data={user} loading={loading} title="Work">
      <BasePage title="Edit work" className="work-form-container">
        <WorkForm
          error={workState.error}
          loading={workState.loading}
          onSubmitAction={updateWorkHandler}
          onSubmitText="Update"
          initialData={work}
        />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(WorkEdit, Role.admin);
