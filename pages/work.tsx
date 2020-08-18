import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';
import { GetStaticProps } from 'next';
import WorkModel from '@/models/Work';
import { IWork } from '@/types/models';
import { WorkTimeline } from '@/components/shared/WorkTimeline';

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await new WorkModel().getAll();
//   return {
//     props: {
//       works: data
//     }
//   }
// }

interface WorkProps {
  works: IWork[]
}

export default function Work({ works }: WorkProps) {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout data={data} loading={loading}>
      <BasePage className="timeline">
        <WorkTimeline items={works}/>
      </BasePage>
    </BaseLayout>
  )
}