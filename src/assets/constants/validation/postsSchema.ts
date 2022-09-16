import * as yup from "yup";

export const createPostSchema = yup.object().shape({
  phonenumber: yup
    .string()
    .trim()
    .required("وار د کردن شماره تماس اجباری است")
    .matches(/^(\+98|0)?9\d{9}$/, "لطفا شماره تماس  خود را به درستی وارد کنید"),
  location: yup
    .object()
    .default(undefined)
    .required("انتخاب آدرس روی نقشه الزامی می باشد")
    .shape({
      latitude: yup.number(),
      longitude: yup.number(),
    }),
  address: yup.string().trim().required("وارد کردن آدرس الزامی است"),
  description: yup.string().trim(),
});
