import axios from 'axios';

export const createWork = (data) => axios.post('/api/v1/work', data);