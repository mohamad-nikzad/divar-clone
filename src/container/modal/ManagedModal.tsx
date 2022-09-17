import { closeModalAtom, modalAtom } from "@/atoms";
import Modal from "@/components/modal/Modal";
import { useAtom } from "jotai";
import ConfirmModal from "./ConfirmModal";
import EditPostModal from "./EditPostModal";

const ManagedModal = () => {
  const [modalState] = useAtom(modalAtom);
  const [, closeModal] = useAtom(closeModalAtom);

  const modalView = () => {
    switch (modalState.view) {
      case "EDIT_POST":
        return <EditPostModal post={modalState.data} />;
      case "DELETE_POST":
        return (
          <ConfirmModal
            title={modalState?.data?.title}
            onConfirm={modalState?.data?.onConfirm}
            onCancel={modalState?.data?.onCancel}
            cancelText={modalState?.data?.cancelText}
            confirmText={modalState?.data?.confirmText}
            isLoading={modalState?.data?.isLoading}
          />
        );
      case "LOG_OUT":
        return (
          <div className="bg-base-100 p-4 flex flex-col md:max-h-[90vh] w-screen h-screen  md:max-w-[95%] md:mx-auto md:rounded-xl lg:mx-w-4xl  xl:max-w-6xl">
            LOG_OUT
          </div>
        );
      default:
        return <h1>default</h1>;
    }
  };
  return (
    <Modal
      isOpen={modalState.isOpen}
      closeModal={closeModal}
      containerClassName="bg-base-200"
    >
      {modalView()}
    </Modal>
  );
};

export default ManagedModal;
