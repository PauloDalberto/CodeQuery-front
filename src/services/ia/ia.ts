import { API } from "../api";

export const chatAiApi = async (uuid: string, message: string) => {
  const response = await API.post(`/chat/${uuid}`, { message });
  return response.data;
} 