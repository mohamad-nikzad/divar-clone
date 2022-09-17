import { closeModalAtom } from "@/atoms";
import clsx from "clsx";
import { useAtom } from "jotai";
import { FC } from "react";

type Props = {
  title: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
};

const ConfirmModal: FC<Props> = ({
  title,
  cancelText = "انصراف",
  confirmText = "حذف",
  onCancel,
  onConfirm,
  isLoading,
}) => {
  const [, closeModal] = useAtom(closeModalAtom);

  const handleOnCancel = () => {
    onCancel && onCancel();
    closeModal();
  };
  const handleOnConfirm = () => {
    onConfirm && onConfirm();
    closeModal();
  };

  return (
    <div className="min-w-[300px] overflow-hidden max-w-md w-full p-8">
      <h4 className="text-xl text-bold">{title}</h4>
      <div className="flex mt-6 justify-end w-full">
        <button
          className={clsx("btn btn-error ml-3", { loading: isLoading })}
          onClick={handleOnConfirm}
        >
          {confirmText}
        </button>
        <button
          onClick={handleOnCancel}
          className={clsx("btn btn-error btn-outline", {
            "!btn-disabled": isLoading,
          })}
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
