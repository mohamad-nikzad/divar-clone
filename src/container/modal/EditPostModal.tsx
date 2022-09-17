import { createPostSchema } from "@/assets/constants";
import { closeModalAtom, userAtom } from "@/atoms";
import { LocationArea, Textarea, TextInput } from "@/components";
import { axios } from "@/libs";
import { createPostType, Post } from "@/types/post";
import { DevicePhoneMobileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useAtom } from "jotai";
import { FC, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

// #todo create one compoent for create and udpate post

interface Props {
  post: Post;
}

const EditPostModal: FC<Props> = ({ post }) => {
  const [, closeModal] = useAtom(closeModalAtom);
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<createPostType>({
    resolver: yupResolver(createPostSchema),
  });

  const updatePost = useMutation(
    (body: createPostType) =>
      axios.patch(`/posts/${post.id}`, body, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", post.id.toString()], {
          stale: true,
          exact: true,
        });
        queryClient.removeQueries(["posts"]);
        closeModal();
      },
    }
  );

  const onSubmit = (data: createPostType) => {
    updatePost.mutate(data);
  };

  return (
    <form
      className="flex flex-col p-4 max-w-lg bg-base-200 pt-20 w-screen"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex z-[9999] items-center border-b justify-between w-full fixed right-0 top-0  bg-base-200 p-2">
        <h3 className="text-lg font-bold">ویرایش آگهی</h3>
        <div className="flex">
          <button
            onClick={closeModal}
            type="button"
            className="btn btn-small btn-error btn-outline text-rose-500 gap-1"
          >
            بستن
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <TextInput
        control={control}
        name="phonenumber"
        label="شماره تماس"
        placeholder="مثال : 09xx xxx xxxx"
        className="input-bordered placeholder:text-xs"
        type="tel"
        defaultValue={post.phonenumber}
        leftElement={<DevicePhoneMobileIcon className="w-6 h-6" />}
      />
      {/* lazy loaded component that containing map for reducing bundle size */}
      <Suspense>
        <LocationArea
          allowScrollZoom={false}
          control={control}
          name="location"
          label="نقشه"
          defaultValue={post.location}
        />
      </Suspense>
      <Textarea
        name="address"
        control={control}
        label="آدرس"
        placeholder="لطفا آدرس خود را به صورت کامل وارد کنید"
        rows={4}
        defaultValue={post.address}
      />
      <Textarea
        name="description"
        control={control}
        label="توضیحات"
        rows={4}
        defaultValue={post.description}
      />

      <button
        className={clsx("btn w-full btn-warning mt-6", {
          loading: updatePost.isLoading,
        })}
        type="submit"
      >
        ویرایش
      </button>
    </form>
  );
};

export default EditPostModal;
