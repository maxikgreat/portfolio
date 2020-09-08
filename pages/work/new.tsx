import { Grid, Icon } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { useState, ChangeEvent, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { Role, User } from '@/types/auth0';

interface WorkNewProps {
  user: User,
  loading: boolean,
}

interface FormState {
  jobPosition: string,
  company: string,
  companyWebsite: string,
  activeDescPoint: string,
  keyPoint: string,
}

interface ManualFormState {
  descriptionPoints: string[] | [],
  dateRange: string,
}

const defaultPlaceholder = '...';

function WorkNew({ user, loading }: WorkNewProps) {
  const { 
    register, 
    handleSubmit, 
    errors, 
    getValues, 
    setValue,
    watch,
  } = useForm<FormState>();

  const [manualForm, setManualForm] = useState<ManualFormState>({
    descriptionPoints: [],
    dateRange: '',
  });

  const onChangeHandler = (
    { target: { name, value } }: ChangeEvent<HTMLInputElement>
  ): void => {
    // setForm({
    //   ...form,
    //   [name]: value
    // });
  };

  const addDescPointHandler = (): void => {
    setManualForm({
      ...manualForm,
      descriptionPoints: [...manualForm.descriptionPoints, getValues('activeDescPoint')],
    });
    setValue('activeDescPoint', '');
  };

  const showDescPoints = (): JSX.Element[] => (
    manualForm.descriptionPoints as string[]
  ).map((point, index) => (
    <Fragment key={index}>
      <li key={index}>
        {point}
        <Icon name="close" onClick={() => removeDescPoint(index)} className="remove-icon" />
      </li>
    </Fragment>
  ));

  const removeDescPoint = (
    index: number
  ): void => {
    const tempPoints = [...manualForm.descriptionPoints];
    tempPoints.splice(index, 1);
    setManualForm({
      ...manualForm,
      descriptionPoints: tempPoints,
    });
  };

  // const isError = (field): string => errors[field] && 'error';

  const onSubmit = (data) => console.log('data', data);

  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="New work record" className="new-work-container">
        <Grid columns={2} as="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid.Row className="image-bordered-shadow back-shadow">
            <Grid.Column>
              <h2 className="special-text-white">
                Job position&nbsp;
                <Icon name="spy" className="special-text" />
              </h2>
              <input
                className={`input-container ${errors.jobPosition && 'error'}`}
                placeholder={defaultPlaceholder}
                name="jobPosition"
                ref={register({ required: true })}
              />
              <h2 className="special-text-white">
                Company&nbsp;
                <Icon name="building" className="special-text" />
              </h2>
              <input
                className={`input-container ${errors.company && 'error'}`}
                placeholder={defaultPlaceholder}
                name="company"
                ref={register({ required: true })}
              />
              <h2 className="special-text-white">
                Company website&nbsp;
                <Icon name="globe" className="special-text" />
              </h2>
              <input
                className={`input-container ${errors.companyWebsite && 'error'}`}
                placeholder={defaultPlaceholder}
                name="companyWebsite"
                ref={register({ required: true })}
              />
              <h2 className="special-text-white">
                Work range&nbsp;
                <Icon name="calendar" className="special-text" />
              </h2>
              <SemanticDatepicker
                showToday={false}
                icon={null}
                clearIcon={null}
                type="range"
                format="DD/MM/YYYY"
                name="dateRange"
                placeholder={defaultPlaceholder}
                className="rangepicker input-container"
              />
            </Grid.Column>
            <Grid.Column>
              <h2 className="special-text-white">
                Description points&nbsp;
                <Icon name="pin" className="special-text" />
              </h2>
              {manualForm.descriptionPoints.length > 0 && 
                <ul className="desc-points-container">{showDescPoints()}</ul>
              }
              {watch('activeDescPoint') && <Icon
                name="add" 
                size="huge" 
                className="add-desc-point" 
                onClick={addDescPointHandler}
              />}
              <textarea
                className={`${errors.activeDescPoint && 'error'}`}
                name="activeDescPoint"
                placeholder={defaultPlaceholder}
                ref={register()}
              />
              <h2 className="special-text-white">
                Key point&nbsp;
                <Icon name="gem" className="special-text" />
              </h2>
              <textarea
                className={`${errors.keyPoint && 'error'}`}
                name="keyPoint"
                placeholder={defaultPlaceholder}
                ref={register({ required: true })}
              />
              <button
                className="btn-glow btn-glow-small btn-hover-shine"
              >Add</button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth<WorkNewProps>(WorkNew, Role.admin)
