import axios, { AxiosPromise } from 'axios';

import { IWork, IWorkPrepared } from '@/types/models';

// TODO BASIC MODEL WITH BASE URL AND SIMILAR
class Work {
  public getAll(): AxiosPromise<IWork[]> {
    return axios.get(`${process.env.API_URL}/works`);
  }
  public createNew(data: IWorkPrepared): AxiosPromise {
    return axios.post(`${process.env.API_URL}/works/new`, data);
  }
}

export default Work;