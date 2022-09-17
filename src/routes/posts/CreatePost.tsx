import { userAtom } from "@/atoms";
import { LocationArea, PageTitle, Textarea, TextInput } from "@/components";
import {
  ArrowRightIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { createPostType } from "@/types/post";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostSchema } from "@/assets/constants";
import { useMutation, useQueryClient } from "react-query";
import { postRequestHandler } from "@/libs/api";
import clsx from "clsx";
import { Suspense } from "react";

const CreatePost = () => {
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<createPostType>({
    resolver: yupResolver(createPostSchema),
  });
  const createPost = useMutation(
    (body: any) => postRequestHandler("/posts", body, user.accessToken),
    {
      onSuccess: () => {
        navigate("/");
        // refetch posts list
        queryClient.refetchQueries("posts");
      },
    }
  );

  const goBack = () => {
    navigate(-1);
  };

  // redirect user to home page if its not logged in
  if (!user) return <Navigate to="/" replace />;

  const onSubmit: SubmitHandler<createPostType> = (data) => {
    createPost.mutate({ ...data, userId: user.id, author: user.name });
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="ثبت آگهی" />
      <form
        className="flex flex-col bg-base-300 p-4 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        {/* lazy loaded component that containing map for reducing bundle size */}
        <Suspense>
          <LocationArea
            control={control}
            name="location"
            label="نقشه"
            requiredMark
          />
        </Suspense>
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
