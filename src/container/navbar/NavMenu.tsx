import { userAtom } from "@/atoms";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { memo } from "react";
import { Link } from "react-router-dom";

const NavMenu = () => {
  const [user, setUser] = useAtom(userAtom);
  const handleLogout = () => {
    setUser(null);
  };

  if (!user) return null;
  return (
    <div className="flex items-center">
      <p className="ml-2 text-xs relative hidden md:flex items-center">
        خوش آمدید
        <span className="font-bold normal-case !text-lg mr-2">{user.name}</span>
      </p>
      <div className="dropdown dropdown-end">
        {/* <label
          tabIndex={0}
          className="items-center hidden md:flex rounded-btn !pl-1"
        >
          <EllipsisVerticalIcon className="w-5 h-5" />
        </label> */}
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <EllipsisVerticalIcon className="w-5 h-5" />
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-[160px]"
        >
          <li>
            <button className="justify-between btn btn-ghost !btn-disabled">
              <span className="hidden md:inline-flex"> پروفایل</span>
              <span className="md:hidden truncate">{user.name}</span>
              <UserCircleIcon className="h-6 w-6" />
            </button>
          </li>
          <div className="divider my-0" />
          <li>
            <Link to="/post/create" className="justify-between btn btn-ghost">
              ثبت آگهی
              <PlusIcon className="h-6 w-6" />
            </Link>
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
    </div>
  );
};

export default memo(NavMenu);
