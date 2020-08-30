import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';

export default function CV() {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout data={data} loading={loading}>
      <BasePage title="Curriculum Vitae">
      </BasePage>
    </BaseLayout>
  )
}
