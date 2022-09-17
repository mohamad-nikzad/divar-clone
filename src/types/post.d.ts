import { User } from "./user";

export type positionMap = {
  longitude: number;
  latitude: number;
};

export type Post = {
  address: string;
  description?: string;
  id: number;
  location: positionMap;
  phonenumber: string;
  userId: number;
  author: string;
};

export type createPostType = {
  address: string;
  description?: string;
  location: positionMap;
  phonenumber: string;
  author: string;
};

export type postMetaType = {
  first: string;
  last: string;
  prev?: string;
  next?: string;
  current: string | number;
};
