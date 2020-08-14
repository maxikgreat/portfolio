import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';

export default function About() {

  const { data, loading } = useGetUser();

  return (
    <BaseLayout data={data} loading={loading}>
      <BasePage>
        <h1>About page</h1>
      </BasePage>
    </BaseLayout>
  )
}
