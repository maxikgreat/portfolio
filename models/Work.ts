import axios, { AxiosPromise } from 'axios';

import { IWork } from '@/types/models';

// TODO BASIC MODEL WITH BASE URL AND SIMILAR
class Work {
  public getAll(): AxiosPromise<IWork[]> {
    return axios.get(`${process.env.BASE_URL}/works`);
  }
}

export default Work;