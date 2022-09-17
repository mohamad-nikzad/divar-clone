import { lazy } from "react";

export { default as Navbar } from "./navbar/Navbar";
export { default as NavbarMenu } from "./navbar/NavMenu";

// post
export { default as PostCard } from "./post/PostCard";
export { default as PostsList } from "./post/PostsList";
export { default as PostsPagination } from "./post/PostsPagination";
export { default as PostItem } from "./post/PostItem";
export const PostMapItem = lazy(() => import("./post/PostMapItem"));

// modal
export { default as ManagedModal } from "./modal/ManagedModal";
export const EditPostModal = lazy(() => import("./modal/EditPostModal"));
export const ConfirmModal = lazy(() => import("./modal/ConfirmModal"));
