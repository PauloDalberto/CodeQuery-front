import { API } from "../api";

export const chatAiApi = async (uuid: string, message: string) => {
  const response = await API.post(`/chat/${uuid}`, { message });
  return response.data;
} 

export const challengeAiApi = async (uuid: string, message: string) => {
  const response = await API.post(`/challenge/${uuid}`, { message });
  return response.data;
} 