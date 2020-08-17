import axios, { AxiosPromise } from 'axios';

import { IWork } from '@/types/models';

class Work {
  public getAll(): AxiosPromise<IWork[]> {
    return axios.get('http://localhost:3001/api/v1/works');
  }
}

export default Work;