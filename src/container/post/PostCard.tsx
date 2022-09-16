import { Post } from "@/types/post";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

const PostCard: FC<Props> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="card shadow-xl bg-base-300">
      <div className="card-body">
        <h2 className="card-title border-b border-b-gray-600 ">
          کاربر : {post.author}
        </h2>
        <p>{post.address}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-link">مشاهده جزییات</button>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
