import { Grid, Icon, Button, Message } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { SemanticDatepickerProps } from 'react-semantic-ui-datepickers/dist/types';
import { useState, useRef, SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTransition, animated } from 'react-spring';

import { IWorkPrepared, IWork } from '@/types/models';

const defaultPlaceholder = '...';

interface FormState {
  jobPosition: string,
  location: string,
  company: string,
  companyWebsite: string,
  activeDescPoint: string,
  keyPoint: string,
}

interface ManualFormState {
  descriptionPoints: string[] | [],
  dateRange: Date[] | [],
}

interface WorkFormProps {
  onSubmitAction: (data?) => Promise<void>,
  error: string,
  loading: boolean,
  initialData?: IWork
}

export const WorkForm = ({ onSubmitAction, error, loading, initialData }: WorkFormProps) => {
  const dateRangePickerRef = useRef<SemanticDatepicker>();

  const { 
    register, 
    handleSubmit, 
    errors, 
    getValues, 
    setValue,
    watch,
    formState,
  } = useForm<FormState>({
    defaultValues: initialData
      ? {
        company: initialData.company,
        companyWebsite: initialData.companyWebsite,
        jobPosition: initialData.jobPosition,
        keyPoint: initialData.keyPoint,
        location: initialData.location,
      } : {},
  });

  const [manualForm, setManualForm] = useState<ManualFormState>(
    initialData ? {
      descriptionPoints: initialData.descriptionPoints,
      dateRange: initialData.endDate
        ? [new Date(initialData.startDate), new Date(initialData.endDate)]
        : [new Date(initialData.startDate)]
    } : {
      descriptionPoints: [],
      dateRange: []
    }
  );

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
    if (!Array.isArray(data.value)) {
      return;
    }
    const workRange = endDate ? [...(data.value as Date[])] : [(data.value as Date[]).shift()];
    setManualForm({
      ...manualForm,
      dateRange: workRange,
    });
    console.log(dateRangePickerRef.current.state);
    if (!endDate && workRange.length === 1) {
      dateRangePickerRef.current.close(_);
    }
  };

  const setEndDateHandler = () => {
    setManualForm({
      ...manualForm,
      dateRange: [],
    });
    setEndDate(!endDate);
    // @ts-ignore event may be optional
    dateRangePickerRef.current.clearInput();
  }

  const isError = (field: keyof FormState): string => errors[field] && 'error';

  const isArrayEmptyError = (
    field: keyof ManualFormState
  ): string => manualForm[field].length === 0 && formState.isSubmitted ? 'error' : '';

  const onSubmit = ({ keyPoint, company, companyWebsite, location, jobPosition }: FormState) => {
    const { descriptionPoints, dateRange } = manualForm;
    if (descriptionPoints.length > 0 && dateRange.length > 0 ) {
      const dataPrepared: IWorkPrepared = {
        company,
        companyWebsite,
        location,
        jobPosition,
        descriptionPoints,
        keyPoint,
        startDate: dateRange[0].toISOString(),
        endDate: dateRange[1]?.toISOString(),
      };
      onSubmitAction(dataPrepared);
    }
  }

  return (
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
          <h2 className={`special-text-white ${isError('location')}`}>
            Location&nbsp;
            <Icon name="location arrow" className={`special-text ${isError('location')}`} />
          </h2>
          <input
            className={`input-container ${isError('location')}`}
            placeholder={defaultPlaceholder}
            name="location"
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
              value={initialData 
                ? initialData.endDate 
                  ? [new Date(initialData.startDate), new Date(initialData.endDate)]
                  : [new Date(initialData.startDate)]
                : null
              }
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
          <div>
            <Button
              basic
              fluid
              size="huge"
              loading={loading}
              disabled={loading}
              className="rewrited"
            >Add</Button>
            {error && 
            <Message negative>
              <Message.Header>{error}</Message.Header>
            </Message>
            }
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};
