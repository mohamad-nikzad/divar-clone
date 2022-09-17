import { AxiosError } from "axios";
import { onlineManager } from "react-query";
import { toast } from "react-toastify";

export const ResponseErrorHandler = (error: AxiosError) => {
  const response: any = error?.response?.data;
  const status: number | undefined = error?.response?.status;
  let message: string | undefined = "";
  const serverMessage: unknown = error.response?.data || error.message;

  // return server error message if its available
  if (typeof serverMessage === "string" && serverMessage !== "")
    toast.error(serverMessage);
  // return custom errors
  else if (error.code === "ECONNABORTED") message = "سرور مشغول است";
  else if (!onlineManager.isOnline())
    message = "اتصال شما به انترنت قطع شده است";
  else if (status === 500 || (error.isAxiosError && error?.response === null))
    message = response?.message || "خطایی رخ داده است";
  if (message !== "" && !error?.config?.headers?.silent) {
    toast.error(message);
  }
  return Promise.reject(error);
};
