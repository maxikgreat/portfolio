import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';
import { GetStaticProps } from 'next';
import WorkModel from '@/models/Work';
import { IWork } from '@/types/models';

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await new WorkModel().getAll();
  return {
    props: {
      works: data
    }
  }
}

interface WorkProps {
  works: IWork[]
}

export default function Work({ works }: WorkProps) {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout data={data} loading={loading}>
      <BasePage>
        <ul>
          {works.map(work => (
            <li key={work._id}>{work.title}</li>
          ))}
        </ul>
      </BasePage>
    </BaseLayout>
  )
}