import { userAtom } from "@/atoms";
import { ThemeSwaper } from "@/components";
import clsx from "clsx";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { NavbarMenu } from "..";

const Navbar = () => {
  const [user] = useAtom(userAtom);

  return (
    <div className="navbar bg-base-300">
      <div className="container mx-auto">
        <div className="flex-1 flex items-center">
          <Link to="/" className="text-rose-600 text-2xl font-bold">
            دیــــــــــــوار
          </Link>
          <div className="w-px mx-3 h-7 bg-gray-400 hidden md:flex" />
          <div
            className={clsx(
              "tooltip tooltip-bottom tooltip-error hidden md:flex",
              {
                "tooltip-hidden": user,
              }
            )}
            data-tip={`${!user ? "برای ثبت آگهی باید وارد  شوید" : ""}`}
          >
            <Link
              to="/post/create"
              className={clsx("btn btn-warning font-bold md:text-lg", {
                "btn-disabled": !user,
              })}
            >
              ثبت آگهی
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ThemeSwaper className="ml-2" />
          <div className="w-px h-7 bg-gray-400" />
          {user ? (
            <NavbarMenu />
          ) : (
            <Link to="/auth/login" className="btn compact mr-2">
              ورود / ثبت نام
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
