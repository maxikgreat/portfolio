import { Grid, Icon } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { SemanticDatepickerProps } from 'react-semantic-ui-datepickers/dist/types';
import { useState, useRef, SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTransition, animated } from 'react-spring';

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
  dateRange: Date[] | [],
}

const defaultPlaceholder = '...';

function WorkNew({ user, loading }: WorkNewProps) {
  const dateRangePickerRef = useRef();
  const { 
    register, 
    handleSubmit, 
    errors, 
    getValues, 
    setValue,
    watch,
    formState,
  } = useForm<FormState>();

  const [manualForm, setManualForm] = useState<ManualFormState>({
    descriptionPoints: [],
    dateRange: [],
  });

  const [endDate, setEndDate] = useState<boolean>(true);
  
  const descPoints = useTransition(manualForm.descriptionPoints, {
    from: { 
      transform: 'translateX(-100%)',
      opacity: 0,
    },
    enter: { 
      transform: 'translateX(0)',
      opacity: 1,
    },
    leave: { 
      opacity: 0, 
      textDecoration: 'line-through',
    },
  });

  const addDescPointHandler = (): void => {
    setManualForm({
      ...manualForm,
      descriptionPoints: [...manualForm.descriptionPoints, getValues('activeDescPoint')],
    });
    setValue('activeDescPoint', '');
  };

  const showDescPoints = (): JSX.Element => descPoints((style, item, _, i) => (
    // @ts-ignore
    <animated.li key={i} style={style}>
      {item}
      <Icon name="close" onClick={() => removeDescPoint(i)} className="remove-icon" />
    </animated.li>
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

  const onDatePickerHandler = (
    _: SyntheticEvent, 
    data: SemanticDatepickerProps
  ): void => {
    const workRange = endDate ? [...(data.value as Date[])] : [(data.value as Date[]).shift()];
    setManualForm({
      ...manualForm,
      dateRange: workRange,
    });
    if (!endDate && workRange.length === 1) {
      dateRangePickerRef.current.close();
    }
  };

  const setEndDateHandler = () => {
    const { dateRange } = manualForm;
    if (dateRange.length === 2) {
      setManualForm({
        ...manualForm,
        dateRange: [dateRange.shift()],
      });
      console.log(dateRangePickerRef.current);
    }
    setEndDate(!endDate);

    // TODO DELETE 2 DATE on input value
  }

  const isError = (field: keyof FormState): string => errors[field] && 'error';

  const isArrayEmptyError = (
    field: keyof ManualFormState
  ): string => manualForm[field].length === 0 && formState.isSubmitted ? 'error' : '';

  const onSubmit = (data: FormState) => {
    const { descriptionPoints, dateRange } = manualForm;
    if (descriptionPoints.length > 0 && dateRange.length > 0 ) {
      console.log("OK");
    }
  }

  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="New work record" className="new-work-container">
        <Grid columns={2} as="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid.Row className="image-bordered-shadow back-shadow">
            <Grid.Column>
              <h2 className={`special-text-white ${isError('jobPosition')}`}>
                Job position&nbsp;
                <Icon name="spy" className={`special-text ${isError('jobPosition')}`} />
              </h2>
              <input
                className={`input-container ${isError('jobPosition')}`}
                placeholder={defaultPlaceholder}
                name="jobPosition"
                ref={register({ required: true })}
              />
              <h2 className={`special-text-white ${isError('company')}`}>
                Company&nbsp;
                <Icon name="building" className={`special-text ${isError('company')}`} />
              </h2>
              <input
                className={`input-container ${isError('company')}`}
                placeholder={defaultPlaceholder}
                name="company"
                ref={register({ required: true })}
              />
              <h2 className={`special-text-white ${isError('companyWebsite')}`}>
                Company website&nbsp;
                <Icon name="globe" className={`special-text ${isError('companyWebsite')}`} />
              </h2>
              <input
                className={`input-container ${isError('companyWebsite')}`}
                placeholder={defaultPlaceholder}
                name="companyWebsite"
                ref={register({ required: true })}
              />
              <h2 className={`special-text-white ${isArrayEmptyError('dateRange')}`}>
                Work range&nbsp;
                <Icon name="calendar" className={`special-text ${isArrayEmptyError('dateRange')}`} />
              </h2>
              <div className="rangepicker-container">
                <SemanticDatepicker
                  datePickerOnly
                  ref={dateRangePickerRef}
                  showToday={false}
                  icon={null}
                  clearIcon={null}
                  type="range"
                  format="DD/MM/YYYY"
                  name="dateRange"
                  onChange={onDatePickerHandler}
                  placeholder={defaultPlaceholder}
                  className={`rangepicker input-container ${isArrayEmptyError('dateRange')}`}
                />
                <span 
                  className={`no-date-switcher special-text${endDate ? '-white' : ' active'}`}
                  onClick={setEndDateHandler}
                >No end date</span>
              </div>
            </Grid.Column>
            <Grid.Column>
              <h2 className={`special-text-white ${isArrayEmptyError('descriptionPoints')}`}>
                Description points&nbsp;
                <Icon name="pin" className={`special-text ${isArrayEmptyError('descriptionPoints')}`} />
              </h2>
                <ul className="desc-points-container">{showDescPoints()}</ul>
              <div className="textarea-container">
                <textarea
                  className={`${isArrayEmptyError('descriptionPoints')}`}
                  name="activeDescPoint"
                  placeholder={defaultPlaceholder}
                  ref={register()}
                />
                <Icon
                  name="add" 
                  size="huge" 
                  className={`add-desc-point ${!watch('activeDescPoint') && 'disabled'}`}
                  onClick={watch('activeDescPoint') ? addDescPointHandler : null}
                />
              </div>
              <h2 className={`special-text-white ${isError('keyPoint')}`}>
                Key point&nbsp;
                <Icon name="gem" className={`special-text ${isError('keyPoint')}`} />
              </h2>
              <textarea
                className={`${isError('keyPoint')}`}
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
