import { atom } from "jotai";
import Cookies from "js-cookie";

type themeType = "light" | "dark";

const getInitialTheme = () => {
  return Cookies.get("theme") ?? "light";
};

const initTheme = atom(getInitialTheme());

export const themeAtom = atom(
  (get) => get(initTheme),
  (get, set) => {
    const newTheme = get(initTheme) === "light" ? "dark" : "light";
    set(initTheme, newTheme);
    Cookies.set("theme", newTheme);
  }
);
