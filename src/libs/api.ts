import { axios } from ".";

export const postRequestHandler = (url: string, body: any, token?: string) =>
  axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });

// export const createPostHandler = (url:string, body:any) => axios.post
