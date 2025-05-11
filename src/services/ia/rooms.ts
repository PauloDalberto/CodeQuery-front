import { API } from "../api";

export const createRoom = async (title: string) => {
  const response = await API.post(`/conversation`, { title });
  return response.data;
} 

export const room = async () => {
  const response = await API.get(`/conversationsUser`);
  return response.data;
} 

export const listMessages = async (uuid: string) => {
  const response = await API.get(`/conversations/${uuid}/messages`);
  return response.data;
}

export const uptadeConverastion = async (uuid: string) => {
  const response = await API.put(`/conversation/${uuid}`);
  return response.data;
}