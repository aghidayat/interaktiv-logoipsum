import api from '@/config/api';

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};