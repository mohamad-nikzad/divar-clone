import { User } from "./user";

export type Post = {
  address: string;
  description?: string;
  id: number;
  location: {
    lat: number;
    lang: number;
  };
  phonenumber: string;
  userId: number;
  author: string;
};

export type createPostType = {
  address: string;
  description?: string;
  location: {
    latitude: number;
    longitude: number;
  };
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
