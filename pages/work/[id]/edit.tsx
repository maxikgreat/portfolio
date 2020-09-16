import { NextPageContext } from 'next';

import Work from '@/models/Work';
import { IWork } from '@/types/models';
import { User, Role } from '@/types/auth0';
import { withAuth } from '@/components/hoc/withAuth';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { ErrorPage } from '@/components/shared/ErrorPage';

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
    const work = await new Work().getById(id);
    return { props: { work } };
  } catch (e) {
    return { props: { 
      work: null, 
      error: (e.response && e.response.data) || 'Internal server error',
    }};
  }
};

function WorkEdit({ user, loading, work, error }: WorkEditProps) {

  if (!work || error) {
    return (
      <BaseLayout data={null} loading={false} title="Edit work" className="error">
        <ErrorPage message={error} />
      </BaseLayout>
    ) 
  }

  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="Edit work">
        
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(WorkEdit, Role.admin);
