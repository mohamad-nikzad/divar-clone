import { User } from "@/types";
import { atom } from "jotai";
import Cookies from "js-cookie";

const initialUserAtom = atom(
  Cookies.get("user") ? JSON.parse(Cookies.get("user") || "") : undefined
);

export const userAtom = atom<User, any>(
  (get) => get(initialUserAtom),
  (get, set, newUser: User) => {
    set(initialUserAtom, newUser);
    Cookies.set("user", JSON.stringify(newUser), { expires: 1 / 24 });
  }
);
