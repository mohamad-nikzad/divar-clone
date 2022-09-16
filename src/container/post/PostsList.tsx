import { FC } from "react";
import { Post } from "@/types/post";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
}

const PostsList: FC<Props> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
      {posts &&
        posts.length > 0 &&
        posts.map((post: Post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default PostsList;
