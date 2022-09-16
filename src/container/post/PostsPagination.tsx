import { FC, memo } from "react";
import { postMetaType } from "@/types/post";
import clsx from "clsx";

interface Props {
  handlePagination: (type: "next" | "prev") => void;
  paginationData: postMetaType;
}

const PostsPagination: FC<Props> = ({ paginationData, handlePagination }) => {
  return (
    <div className="w-full mt-4">
      <div className="justify-center btn-group ltr">
        <button
          className={clsx("btn", {
            "btn-disabled": !paginationData?.next,
          })}
          onClick={() => handlePagination("next")}
        >
          بعدی
        </button>
        <button className="btn btn-active">{paginationData.current}</button>
        <button
          onClick={() => handlePagination("prev")}
          className={clsx("btn", {
            "btn-disabled": !paginationData?.prev,
          })}
        >
          قبلی
        </button>
      </div>
    </div>
  );
};

export default memo(PostsPagination);
