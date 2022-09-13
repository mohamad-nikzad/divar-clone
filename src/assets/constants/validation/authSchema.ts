import * as yup from "yup";

const nameSchema = yup
  .string()
  .min(3, "نام کاربری باید حاداقل 3 حرف باشد")
  .required("لطفا نام کاربری خود را وارد کنید");

const passwordSchema = yup
  .string()
  .min(4, "رمزعبور باید حاداقل 4 حرف باشد")
  .required("لطفا رمزعبور خود را وارد کنید");

const emailSchema = yup
  .string()
  .email("لطفا ایمیل خود را به درستی وارد کنید")
  .required("لطفا ایمیل خود را وارد کنید");

export const loginValidationSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const registerValidationSchema = yup.object().shape({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});
