import { API } from "../api";

export const chatAiApi = async (message: string) => {
  const response = await API.post(`/chat`, { message });
  return response.data;
} 