import { API } from "../api"

export const login = async (email: string, password: string) => {
  const response = await API.post('/user/login', { email, password });
  return response.data;
} 

export const register = async (name: string, email: string, password: string) => {
  const response = await API.post('/user/register', { name, email, password });
  return response.data;
}
