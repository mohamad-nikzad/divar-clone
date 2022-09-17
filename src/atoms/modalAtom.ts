import { atom } from "jotai";

type MODAL_VIEWS = "DELETE_POST" | "LOG_OUT" | "EDIT_POST";

type State = {
  view?: MODAL_VIEWS;
  data?: any;
  isOpen: boolean;
};

export const modalAtom = atom<State>({
  isOpen: false,
  view: undefined,
  data: null,
});

export const openModalAtom = atom(
  null,
  (_get, set, { view, data }: { view: MODAL_VIEWS; data?: any }) =>
    set(modalAtom, {
      isOpen: true,
      view: view,
      data: data,
    })
);

export const closeModalAtom = atom(null, (_get, set) =>
  set(modalAtom, {
    isOpen: false,
    view: undefined,
    data: null,
  })
);
