import { userAtom } from "@/atoms";
import { LocationArea, Textarea, TextInput } from "@/components";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { createPostType } from "@/types/post";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostSchema } from "@/assets/constants";
import { useMutation, useQueryClient } from "react-query";
import { postRequestHandler } from "@/libs/api";
import clsx from "clsx";

const CreatePost = () => {
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<createPostType>({
    resolver: yupResolver(createPostSchema),
  });
  const createPost = useMutation(
    (body: any) => postRequestHandler("/posts", body),
    {
      onSuccess: () => {
        navigate("/");
        // refetch posts list
        queryClient.invalidateQueries("posts");
      },
    }
  );

  // redirect user to home page if its not logged in
  if (!user) return <Navigate to="/" replace />;

  const onSubmit: SubmitHandler<createPostType> = (data) => {
    createPost.mutate({ ...data, userId: user.id, author: user.name });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-rose-600 text-bold">افزودن آگهی</h1>
      <div className="divider" />
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          control={control}
          name="phonenumber"
          label="شماره تماس"
          placeholder="مثال : 09xx xxx xxxx"
          className="input-bordered placeholder:text-xs"
          type="tel"
          requiredMark
          leftElement={<DevicePhoneMobileIcon className="w-6 h-6" />}
        />
        <LocationArea
          control={control}
          name="location"
          label="نقشه"
          requiredMark
        />
        <Textarea
          name="address"
          control={control}
          label="آدرس"
          placeholder="لطفا آدرس خود را به صورت کامل وارد کنید"
          rows={4}
          requiredMark
        />
        <Textarea
          name="description"
          control={control}
          label="توضیحات"
          rows={4}
        />

        <button
          className={clsx("btn w-full btn-info mt-6", {
            loading: createPost.isLoading,
          })}
          type="submit"
        >
          ثبت آگهی
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
