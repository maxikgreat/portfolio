import { NextPageContext } from 'next';

import Work from '@/models/Work';
import { IWork } from '@/types/models';
import { User, Role } from '@/types/auth0';
import { withAuth } from '@/components/hoc/withAuth';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { ErrorPage } from '@/components/shared/ErrorPage';
import { WorkForm } from '@/components/shared/WorkForm';
import { useUpdateWork } from '@/actions/work';

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

  if (!work || error) {
    return (
      <BaseLayout data={null} loading={false} title="Edit work" className="error">
        <ErrorPage message={error} />
      </BaseLayout>
    ) 
  }

  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="Edit work" className="work-form-container">
        <WorkForm
          error={workState.error}
          loading={workState.loading}
          onSubmitAction={updateWork}
          initialData={work}
        />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(WorkEdit, Role.admin);
