import { themeAtom } from "@/atoms";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useAtom } from "jotai";
import { FC } from "react";

interface Props {
  className?: string;
}

const ThemeSwaper: FC<Props> = ({ className }) => {
  const [theme, toggleTheme] = useAtom(themeAtom);
  return (
    <label className={clsx("swap swap-rotate", className)}>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <SunIcon className="md:w-7 md:h-7 w-6 h-6 swap-on fill-yellow-500" />
      <MoonIcon className="md:w-7 md:h-7 w-6 h-6 swap-off" />
    </label>
  );
};

export default ThemeSwaper;
