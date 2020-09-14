import axios, { AxiosPromise } from 'axios';

import { IWork, IWorkPrepared } from '@/types/models';

interface IConfig {
  headers?: {
    Authorization?: string,
  }
}

// TODO BASIC MODEL WITH BASE URL AND SIMILAR
class Work {
  private config: IConfig;
  constructor(accessToken?: string) {
    if (accessToken) {
      this.config.headers = {
        Authorization: `Bearer ${accessToken}`
      }
    }
  };
  public getAll(): AxiosPromise<IWork[]> {
    return axios.get(`${process.env.API_URL}/works`);
  }
  public createNew(data: IWorkPrepared): AxiosPromise {
    return axios.post(`${process.env.API_URL}/works/new`, data, this.config);
  }
}

export default Work;