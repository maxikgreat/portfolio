import { useSpring, animated, config, useChain, useSprings, SpringValue } from 'react-spring';
import { useRef } from 'react';

import { delay } from '@/consts';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';
import { GetServerSideProps } from 'next';
import WorkModel from '@/models/Work';
import { IWork } from '@/types/models';
import { WorkBlock } from '@/components/shared/WorkBlock';
import { ErrorPage } from '@/components/shared/ErrorPage';

interface WorkProps {
  works: IWork[] | null,
  error?: string,
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await new WorkModel().getAll();
    return {
      props: {
        works: data.reverse(),
      }
    }
  } catch (e) {
    return {
      props: {
        works: null,
        error: (e.response && e.response.data) || 'Internal server error',
      }
    }
  }
}

export default function Work({ works, error }: WorkProps) {
  // TODO remaster useGetUser
  // const { data, loading } = useGetUser(); 

  if (!works || error) {
    return (
      <BaseLayout data={null} loading={false} title="Work" className="error">
        <ErrorPage message={error} />
      </BaseLayout>
    );
  }

  const containerWorkRef = useRef();
  const elementWorkRef = useRef();

  const containerProps: {
    transform: SpringValue<string>
  } = useSpring({
    ref: containerWorkRef,
    config: config.slow,
    transform: 'translateX(0)',
    opacity: 1,
    from: {
      transform: 'translateX(-100%)',
      opacity: 0,
    },
  });

  const elementsWork: {
    transform: SpringValue<string>,
    opacity: SpringValue<number>
  }[] = useSprings(
    works.length,
    works.map((_, index) => ({
      ref: elementWorkRef,
      config: config.slow,
      delay: delay * index,
      transform: 'translateY(0)',
      opacity: 1,
      from: {
        transform: 'translateY(-100%)',
        opacity: 0,
      },
    }))
  );

  useChain([containerWorkRef, elementWorkRef], [0, 1]);

  // TODO remaster useGetUser
  return (
    <BaseLayout data={null} loading={false} title="Work">
      <BasePage title="Helped me to grow">
        <animated.div className="timeline" style={containerProps}>
          {elementsWork.map((props, index) => (
            <WorkBlock work={works[index]} props={props} key={index}/>
          ))}
        </animated.div>
      </BasePage>
    </BaseLayout>
  )
}