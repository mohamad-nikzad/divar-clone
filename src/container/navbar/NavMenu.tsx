import { userAtom } from "@/atoms";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { memo } from "react";

const NavMenu = () => {
  const [user, setUser] = useAtom(userAtom);
  const handleLogout = () => {
    setUser(null);
  };

  if (!user) return null;
  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost hidden md:inline-flex rounded-btn !pl-1"
      >
        <p className="ml-2 text-xs">
          خوش آمدید
          <span className="font-bold normal-case !text-lg mr-2">
            {user.name}
          </span>
        </p>
        <ChevronDownIcon className="w-5 h-5" />
      </label>
      <label tabIndex={0} className="btn btn-ghost btn-circle md:hidden">
        <Bars3Icon className="w-6 h-6" />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-[160px]"
      >
        <li>
          <button
            className="justify-between btn btn-ghost"
            onClick={handleLogout}
          >
            <span className="hidden md:inline-flex"> پروفایل</span>
            <span className="md:hidden truncate">{user.name}</span>
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </li>
        <div className="divider my-0" />
        <li>
          <button
            className="justify-between btn btn-ghost text-rose-500"
            onClick={handleLogout}
          >
            خروج
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default memo(NavMenu);
