import { openModalAtom } from "@/atoms";
import { useAtom } from "jotai";
import React from "react";

type Props = {
  title: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
};

const useConfirmModal = ({
  title,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  isLoading,
}: Props) => {
  const [, setConfrimModal] = useAtom(openModalAtom);

  const open = () => {
    setConfrimModal({
      view: "DELETE_POST",
      data: { title, cancelText, confirmText, onCancel, onConfirm, isLoading },
    });
  };

  return { open };
};

export default useConfirmModal;
