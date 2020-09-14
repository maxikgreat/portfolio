import axios from 'axios';

import { useApiHandler } from './';
import { IWorkPrepared, IWork } from '@/types/models';

const createWork = (data: IWorkPrepared) => axios.post('/api/v1/work', data);

export const useCreateWork = () => useApiHandler<IWorkPrepared, IWork>(createWork);
