import { useSpring, animated, config as springConfig, useChain, useSprings, SpringValue } from 'react-spring';
import { useRef } from 'react';
import { Button } from 'semantic-ui-react';

import { delay } from '@/consts';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';
import { useDeleteWork } from '@/actions/work';
import { GetServerSideProps } from 'next';
import WorkModel from '@/models/Work';
import { IWork } from '@/types/models';
import { WorkBlock } from '@/components/shared/WorkBlock';
import { ErrorPage } from '@/components/shared/ErrorPage';
import Router from 'next/router';
import { Role } from '@/types/auth0';
import { rolePassed } from '@/utils/auth0';
import { toast } from 'react-toastify';
import { Redirect } from '@/components/shared/Redirect';
import { CustomModal } from '@/components/shared/CustomModal';

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
  const { data } = useGetUser();
  const [deleteWork, workState] = useDeleteWork();

  const containerWorkRef = useRef();
  const elementWorkRef = useRef();

  if (!works || error) {
    return (
      <BaseLayout data={null} loading={false} title="Work" className="error">
        <ErrorPage message={error} />
      </BaseLayout>
    );
  }

  const containerProps: {
    transform: SpringValue<string>
  } = useSpring({
    ref: containerWorkRef,
    config: springConfig.slow,
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
      config: springConfig.slow,
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

  const deletePortfolioHandler = (id: string) => {
    // @ts-ignore need to rewrite apihandler in better way
    deleteWork(id)
      .then(() => toast('Deleted successfully!', {
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
      }))
      .catch((e) => toast(e, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-message error image-bordered-shadow-small-error",
        bodyClassName: "toast-message-body special-text-small-error ",
        progressClassName: 'toast-message-progress'
      }))
  }

  const showAdminOpts = data && rolePassed(data, Role.admin);

  if (workState.data) return <Redirect to="/work" ssr />

  return (
    <BaseLayout data={null} loading={false} title="Work">
      <BasePage 
        title="Helped me to grow" 
        actionButton={showAdminOpts && 
        <div className="buttons-container">
        <Button
          basic
          className="rewrited"
          onClick={() => Router.push('/work/new')}
        >Add work</Button>
        </div>}
        >
        <animated.div className="timeline" style={containerProps}>
          {elementsWork.map((props, index) => (
            <WorkBlock work={works[index]} props={props} key={index}>
              {showAdminOpts &&
              <div className="buttons-container">
                <Button
                  basic
                  className="rewrited"
                  onClick={() => Router.push('/work/[id]/edit', `/work/${works[index]._id}/edit`)}
                >Edit</Button>
                <Button
                  basic
                  className="rewrited red"
                  onClick={() => deletePortfolioHandler(works[index]._id)}
                >Delete</Button>
              </div>
              }
            </WorkBlock>
          ))}
        </animated.div>
      </BasePage>
    </BaseLayout>
  )
}