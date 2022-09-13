import { axios } from ".";

export const authHandler = (url: string, body: any) => axios.post(url, body);
