import { FC } from "react";

interface Props {
  title: string;
  value: string;
}

const PostItem: FC<Props> = ({ title, value }) => {
  return (
    <>
      <div className="flex items-center">
        <span className="text-base font-bold ml">{title}</span>
        <span className="mx-1">:</span>
        <span>{value}</span>
      </div>
      <div className="divider" />
    </>
  );
};

export default PostItem;
