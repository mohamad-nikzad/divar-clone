import { registerValidationSchema } from "@/assets/constants";
import { userAtom } from "@/atoms/userAtom";
import { TextInput } from "@/components";
import {
  AtSymbolIcon,
  FingerPrintIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError, AxiosResponse } from "axios";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { authHandler } from "@/libs/api";
import { registerFields } from "@/types";
import { Link } from "react-router-dom";

const Register = () => {
  const [, setUser] = useAtom(userAtom);
  const { control, handleSubmit } = useForm<registerFields>({
    resolver: yupResolver(registerValidationSchema),
  });
  const { mutate: registerUser, isLoading } = useMutation(
    (body: registerFields) => authHandler("/register", body),
    {
      onSuccess: (res: AxiosResponse) => {
        const user = { accessToken: res.data.accessToken, ...res.data.user };
        user && setUser(user);
      },
    }
  );

  const onSubmit: SubmitHandler<registerFields> = (data) => {
    registerUser(data);
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold py-3">ثبت نام</h2>
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
          label="نام کاربری"
          name="name"
          type="text"
          className="text-center ltr placeholder:text-right"
          leftElement={<UserCircleIcon className="h-6 w-6" />}
          autocomplete="off"
        />
        <TextInput
          control={control}
          name="password"
          label="رمزعبور"
          type="password"
          className="text-center ltr "
          leftElement={<FingerPrintIcon className="h-6 w-6" />}
          autocomplete="off"
        />
        <button
          className={clsx("btn w-full mt-6", { loading: isLoading })}
          type="submit"
        >
          ثبت نام
        </button>
        <div className="divider" />
        <p className="font-medium text-sm md:text-base">
          قبلا ثبت نام کرده اید ؟ از
          <Link to="/auth/login" className="link text-sky-600 mx-1">
            اینجا
          </Link>
          وارد شوید .
        </p>
      </form>
    </>
  );
};

export default Register;
