import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import { IWork, IWorkPrepared } from '@/types/models';

// interface IConfig {
//   headers?: {
//     Authorization?: string,
//   }
// }

// TODO BASIC MODEL WITH BASE URL AND SIMILAR
class Work {
  private config: AxiosRequestConfig = {
    ...axios.defaults.headers,
  };
  
  constructor(accessToken?: string) {
    if (accessToken) {
      this.config.headers = {
        ...axios.defaults.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
  };
  public getAll(): AxiosPromise<IWork[]> {
    return axios.get(`${process.env.API_URL}/works`);
  }
  public createNew(data: IWorkPrepared): AxiosPromise<string> {
    return axios.post(`${process.env.API_URL}/works/new`, data, this.config);
  }
}

export default Work;