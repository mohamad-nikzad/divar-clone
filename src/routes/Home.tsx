import { userAtom } from "@/atoms";
import { PageTitle } from "@/components";
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
      <div className="container mx-auto p-4">
        <PageTitle title="آگهی ها" showGoBack={false} />
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
