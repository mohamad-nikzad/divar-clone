import { Navbar } from "@/container";
import { Outlet } from "react-router-dom";

const Post = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full max-w-lg p-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Post;
