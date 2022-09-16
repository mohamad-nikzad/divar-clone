import { userAtom } from "@/atoms";
import { Navbar, PostsList, PostsPagination } from "@/container";
import { axios } from "@/libs";
import { postMetaType } from "@/types/post";
import { generetaPaginateData } from "@/util";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Home = () => {
  const [user] = useAtom(userAtom);
  const [page, setPage] = useState(1);
  const posts = useQuery(
    ["posts", page],
    () => axios.get(`/posts?_page=${page}`),
    { keepPreviousData: true }
  );

  const paginationData: postMetaType = useMemo(
    () => generetaPaginateData(posts?.data?.headers?.link),
    [page, posts.data?.headers]
  );

  const handlePagination = useCallback(
    (type: "next" | "prev") => {
      setPage((prevPage) => (type === "next" ? prevPage + 1 : prevPage - 1));
    },
    [page]
  );

  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="container max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="md:text-3xl text-2xl text-rose-600 text-bold">
            آگهی های اخیر
          </h1>
          <div
            className={clsx("tooltip tooltip-right tooltip-error", {
              "tooltip-hidden": user,
            })}
            data-tip={`${!user ? "برای ثبت آگهی باید وارد  شوید" : ""}`}
          >
            <Link
              to="/post/create"
              className={clsx("btn btn-warning font-bold md:text-lg", {
                "btn-disabled": !user,
              })}
            >
              ثبت آگهی
            </Link>
          </div>
        </div>
        <div className="divider" />
        {posts.isFetching
          ? "در حال بارگذاری . . . "
          : posts.isFetched &&
            posts?.data?.data.length > 0 && (
              <>
                <PostsList posts={posts?.data?.data} />
                <PostsPagination
                  handlePagination={handlePagination}
                  paginationData={paginationData}
                />
              </>
            )}
      </div>
    </div>
  );
};

export default Home;
