import { userAtom } from "@/atoms";
import { ThemeSwaper } from "@/components";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { NavbarMenu } from "..";

const Navbar = () => {
  const [user] = useAtom(userAtom);

  return (
    <div className="navbar bg-base-300">
      <div className="container mx-auto">
        <div className="flex-1">
          <a className="text-rose-600 text-2xl font-bold">دیــــــــــــوار</a>
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
