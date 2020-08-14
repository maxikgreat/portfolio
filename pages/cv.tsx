import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';

export default function CV() {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout data={data} loading={loading}>
      <BasePage>
        <h1>Hello cv</h1>
      </BasePage>
    </BaseLayout>
  )
}