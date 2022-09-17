import { FC } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

interface Props {
  isAllowed: boolean;
  redirectPath?: string;
}

const Auth: FC<Props> = ({ isAllowed, redirectPath = "/" }) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return (
    <div className="w-screen h-screen bg-base-300 flex items-center justify-center px-4">
      <div className="flex flex-col w-full sm:w-auto">
        <div className="mb-4">
          <Link
            to="/"
            className="md:text-7xl text-5xl text-rose-800 font-bold flex justify-center mb-4 w-full text-center"
          >
            دیــــــــــــوار
          </Link>
        </div>
        <div className="flex flex-col w-full sm:w-[500px]  bg-base-200  rounded-lg p-4 shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
