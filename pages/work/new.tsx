import { Input, Grid, TextArea, Icon } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { useState, ChangeEvent } from 'react';

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { withAuth } from '@/components/hoc/withAuth';
import { Role, User } from '@/types/auth0';

interface WorkNewProps {
  user: User,
  loading: boolean,
}

interface FormState {
  jobPosition: string | '',
  company: string | '',
  companyWebsite: string | '',
  startDate: Date | null,
  endDate: Date | null,
  descriptionPoints: string[] | [],
  keyPoint: string | '',
}

// type CustomChangeEvent<T> = 
//   ChangeEvent<T extends HTMLInputElement 
//     ? HTMLInputElement
//     : HTMLTextAreaElement
//   >;

function WorkNew({ user, loading }: WorkNewProps) {
  const [form, setForm] = useState<FormState>({
    jobPosition: '',
    company: '',
    companyWebsite: '',
    startDate: null,
    endDate: null,
    descriptionPoints: [],
    keyPoint: '',
  });


  const onChangeHandler = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [name]: value
    });
  }

  return (
    <BaseLayout data={user} loading={loading}>
      <BasePage title="New work record" className="new-work-container">
        <Grid columns={2}>
          <Grid.Row className="image-bordered-shadow back-shadow">
            <Grid.Column>
              <Input
                transparent
                icon="code"
                className="input-container"
                placeholder="position..."
                name="jobPosition"
                value={form.jobPosition}
                onChange={onChangeHandler}
              />
              <Input
                transparent
                icon="building"
                className="input-container"
                placeholder="company..."
                name="company"
                value={form.company}
                onChange={onChangeHandler}
              />
              <Input
                transparent
                icon="cloud"
                className="input-container"
                placeholder="company website..."
                name="companyWebsite"
                value={form.companyWebsite}
                onChange={onChangeHandler}
              />
              <SemanticDatepicker
                showToday={false}
                icon={null}
                clearIcon={null}
                type="range"
                format="DD/MM/YYYY"
                className="rangepicker input-container"
              />
            </Grid.Column>
            <Grid.Column>
              <h2 className="special-text-white">Description points</h2>
              <Icon name="add" size="huge" className="add-desc-point" />
              <TextArea />
              <h2 className="special-text-white">Key point</h2>
              <TextArea
                value={form.keyPoint}
                name="keyPoint"
                // @ts-ignore works correctly on textarea
                onChange={onChangeHandler}
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
