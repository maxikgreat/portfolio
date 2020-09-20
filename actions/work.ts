import axios from 'axios';

import { useApiHandler } from './';
import { IWorkPrepared, IWork } from '@/types/models';

const createWork = (data: IWorkPrepared) => axios.post('/api/v1/work/new', data);
const updateWork = (data: IWork, id: string) => axios.patch(`/api/v1/work/${id}`, data);
const deleteWork = (id: string) => axios.delete(`/api/v1/work/${id}`);

export const useCreateWork = () => useApiHandler<IWorkPrepared, IWork>(createWork);
export const useUpdateWork = () => useApiHandler<IWork, IWork>(updateWork);
export const useDeleteWork = () => useApiHandler<null, IWork>(deleteWork);
