import api from '../utils/api';

export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data;
};

export const createCategory = async (data: { code: string; name: string; type?: string }) => {
  const res = await api.post('/categories', data);
  return res.data;
};