import { postMetaType } from "@/types/post";

export const parseLinkHeader = (linkHeader: string) => {
  if (linkHeader)
    return Object.fromEntries(
      linkHeader
        .split(", ")
        .map((header) => header.split("; "))
        .map((header) => [
          header[1].replace(/"/g, "").replace("rel=", ""),
          header[0].slice(1, -1)?.split("_page=")[1],
        ])
    );
};

export const generetaPaginateData = (data: any): postMetaType => {
  const meta = parseLinkHeader(data) as {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
  return {
    ...meta,
    current: meta?.next ? +meta?.next - 1 : meta?.prev ? +meta?.prev + 1 : 1,
  };
};
