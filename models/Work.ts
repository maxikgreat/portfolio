import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import { IWork, IWorkPrepared } from '@/types/models';

class Work {
  private config: AxiosRequestConfig = {
    headers: { ...axios.defaults.headers },
  };
  private apiUrl = `${process.env.API_URL}/works`;

  constructor(accessToken?: string) {
    if (accessToken) {
      this.config.headers = {
        ...axios.defaults.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
  };
  public getAll(): AxiosPromise<IWork[]> {
    return axios.get(`${this.apiUrl}`);
  }
  public getById(id: string): AxiosPromise<IWork> {
    return axios.get(`${this.apiUrl}/${id}`);
  }
  public createNew(data: IWorkPrepared): AxiosPromise<string> {
    return axios.post(`${this.apiUrl}/new`, data, this.config);
  }
  public update(id: string, data: IWork): AxiosPromise<IWork> {
    return axios.patch(`${this.apiUrl}/${id}`, data, this.config);
  }
}

export default Work;