import { API } from "../api";

export const userGitHubApi = async (username: string) => {
  const response = await API.get(`/github/${username}/repos`);
  return response.data;
} 

export const repoGitHubApi = async (username: string, repo: string, uuid: string) => {
  const response = await API.get(`/github/${username}/${repo}/contents/${uuid}`);
  return response.data;
}