import { FC } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  showGoBack?: boolean;
};

const PageTitle: FC<Props> = ({ title, showGoBack = true }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-rose-600 text-bold">{title}</h1>
        {showGoBack && (
          <button
            className="btn btn-link text-base-content gap-2 btn-sm text-lg"
            onClick={goBack}
          >
            <ArrowRightIcon className="w-6 h-6" />
            بازگشت
          </button>
        )}
      </div>
      <div className="divider" />
    </>
  );
};

export default PageTitle;
