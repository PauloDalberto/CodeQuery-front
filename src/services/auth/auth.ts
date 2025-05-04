import { API } from "../api"

export const loginApi = async (email: string, password: string) => {
  const response = await API.post('/user/login', { email, password });
  return response.data;
} 

export const getProfile = async () => {
  const response = await API.get('/user/profile');
  return response.data;
} 

export const registerApi = async (name: string, email: string, password: string) => {
  const response = await API.post('/user/register', { name, email, password });
  return response.data;
}
