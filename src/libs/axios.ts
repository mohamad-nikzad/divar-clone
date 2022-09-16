import { User } from "@/types";
import { ResponseErrorHandler } from "@/util";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const user: User | null | undefined =
  Cookies.get("user") && JSON.parse(Cookies.get("user") || "");
const token = user ? user.accessToken : undefined;

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL && "http://localhost:3000",
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : undefined,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => ResponseErrorHandler(error)
);

export default instance;
