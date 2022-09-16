import { axios } from ".";

export const postRequestHandler = (url: string, body: any) =>
  axios.post(url, body);

// export const createPostHandler = (url:string, body:any) => axios.post
