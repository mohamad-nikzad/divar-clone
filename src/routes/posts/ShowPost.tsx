import { Suspense } from "react";
import { PostItem, PostMapItem } from "@/container";
import { axios } from "@/libs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  TrashIcon,
  PencilIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { openModalAtom, userAtom } from "@/atoms";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useConfirmModal } from "@/hooks";
import { PageTitle } from "@/components";

const ShowPost = () => {
  const { id } = useParams() as { id: string };
  const [user] = useAtom(userAtom);
  const [, openEditModal] = useAtom(openModalAtom);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: postResult,
    isFetching,
    isError,
  } = useQuery(["post", id], () => axios.get(`posts/${id}`));

  const deletePost = useMutation(
    () =>
      axios.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }),
    {
      onSuccess: () => {
        toast("با موفقیت انجام شد", { type: "success" });
        queryClient.removeQueries(["posts"]);
        navigate("/");
      },
    }
  );
  const { open: openDeleteModal } = useConfirmModal({
    title: "آیا از حذف این آگهی اطمینان دارید ؟",
    onConfirm: () => deletePost.mutate(),
    isLoading: deletePost.isLoading,
  });

  const goBack = () => {
    navigate(-1);
  };

  if (isFetching)
    return (
      <div className="text-lg w-full text-center">در حال بارگذاری . . .</div>
    );

  if (isError)
    return (
      <div className="text-lg w-full text-center">آگهی مورد نظر یافت نشد !</div>
    );

  return (
    <>
      <PageTitle title="مشاهده آگهی" />
      <div className="flex flex-col p-4 bg-base-300 rounded-lg shadow-lg">
        <PostItem title="نویسنده" value={postResult?.data.author} />
        <PostItem title="آدرس" value={postResult?.data.address} />
        <PostItem title="شماره تماس" value={postResult?.data.phonenumber} />
        {postResult?.data.description && (
          <PostItem title="توضیحات" value={postResult?.data.description} />
        )}
        {/* lazy loaded component that containing map for reducing bundle size */}
        <Suspense>
          <PostMapItem
            lat={postResult?.data.location.latitude}
            lng={postResult?.data.location.longitude}
            title="موقعیت روی نقشه"
          />
        </Suspense>
        {user && (
          <div className="flex w-full items-center mt-4">
            <button
              className={clsx("btn btn-error btn-outline gap-2", {
                loading: deletePost.isLoading,
                "!btn-disabled": user.id !== postResult?.data.userId,
              })}
              onClick={openDeleteModal}
            >
              <TrashIcon className="w-5 h-5" />
              حذف
            </button>
            <button
              onClick={() =>
                openEditModal({ view: "EDIT_POST", data: postResult?.data })
              }
              className={clsx("btn btn-warning gap-2 mr-2", {
                "!btn-disabled": user.id !== postResult?.data.userId,
              })}
            >
              <PencilIcon className="w-5 h-5" />
              ویرایش
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowPost;
