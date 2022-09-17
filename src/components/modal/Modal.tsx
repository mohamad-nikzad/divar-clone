import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  closeModal(): void;
  containerClassName?: string;
}

const Modal = ({ isOpen, children, containerClassName, closeModal }: Props) => {
  return (
    <Transition as={Fragment} show={isOpen} appear>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 z-[1000] overflow-y-auto"
      >
        <div className="min-h-screen flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <Transition.Child
            as="div"
            className="z-40"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              dir="rtl"
              className={clsx(
                "relative z-50 overflow-auto max-h-screen max-w-screen md:w-fit md:mx-auto md:h-fit rounded-lg bg-body md:max-h-[90vh]",
                containerClassName
              )}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
