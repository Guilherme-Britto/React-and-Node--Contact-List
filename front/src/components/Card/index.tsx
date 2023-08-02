import { Dispatch, useState } from "react";
import { Contact } from "../../pages/Dashboard/@types";
import { api } from "../../services/api";
import { Container } from "./style";
import { ModalUpdateContact } from "../ModalUpdateContact";

interface CardProps {
  contact: Contact;
  contacts: Contact[] | undefined;
  setContacts: Dispatch<React.SetStateAction<Contact[] | undefined>>;
}

export const Card = ({ contact, setContacts, contacts }: CardProps) => {
  const [updateContactModal, setUpdateContactModal] = useState(false);
  const toggleUpdateContactModal = () =>
    setUpdateContactModal(!updateContactModal);

  const deleteContact = async (contact: Contact) => {
    await api.delete(`/contacts/${contact.id}`);

    setContacts(contacts!.filter((c) => c.id !== contact.id));
  };

  return (
    <Container>
      <h3>{contact.name}</h3>
      {contact.email.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      {contact.phoneNumber.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <button onClick={() => deleteContact(contact)}>Deletar</button>
      <button onClick={toggleUpdateContactModal}>Editar</button>

      {updateContactModal && (
        <ModalUpdateContact
          toggleModal={toggleUpdateContactModal}
          contact={contact}
          setContacts={setContacts}
          contacts={contacts}
        />
      )}
    </Container>
  );
};
