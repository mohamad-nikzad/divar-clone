import { TextInput } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { loginFields } from "@/types";
import { postRequestHandler } from "@/libs/api";
import { loginValidationSchema } from "@/assets/constants";
import { Link } from "react-router-dom";
import clsx from "clsx";

const Login = () => {
  const [, setUser] = useAtom(userAtom);
  const { control, handleSubmit } = useForm<loginFields>({
    resolver: yupResolver(loginValidationSchema),
  });
  const login = useMutation(
    (body: loginFields) => postRequestHandler("/login", body),
    {
      onSuccess: (res: AxiosResponse) => {
        const user = { accessToken: res.data.accessToken, ...res.data.user };
        user && setUser(user);
      },
    }
  );

  const onSubmit: SubmitHandler<loginFields> = (data) => {
    login.mutate(data);
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold py-3">ورود</h2>
      <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          control={control}
          label="ایمیل"
          name="email"
          type="email"
          className="text-center ltr placeholder:text-right"
          leftElement={<AtSymbolIcon className="h-6 w-6" />}
          autocomplete="off"
        />
        <TextInput
          control={control}
          name="password"
          label="رمزعبور"
          type="password"
          className="text-center ltr"
          leftElement={<FingerPrintIcon className="h-6 w-6" />}
          autocomplete="off"
        />
        <button
          className={clsx("btn w-full mt-6", { loading: login.isLoading })}
          type="submit"
        >
          ورود
        </button>
        <div className="divider" />
        <p className="font-medium text-sm md:text-base">
          ثبت نام نکرده اید ؟ از
          <Link to="/auth/register" className="link text-sky-600 mx-1">
            اینجا
          </Link>
          ثبت نام کنید.
        </p>
      </form>
    </>
  );
};

export default Login;
