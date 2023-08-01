import { Modal } from "../Modal";

interface ModalDeleteContactProps {
  toggleModal: () => void;
}
export const ModalDeleteContact = ({
  toggleModal,
}: ModalDeleteContactProps) => {
  const submit = () => {};

  return (
    <Modal toggleModal={toggleModal}>
      <button type="button" onClick={submit}>
        Excluir contato
      </button>
    </Modal>
  );
};
