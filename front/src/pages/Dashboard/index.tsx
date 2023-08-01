import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Contact, User } from "./@types";
import { Card } from "../../components/Card";
import { ModalAddContact } from "../../components/FormCreateContact";
import { ModalDeleteContact } from "../../components/ModalDeleteContact";

export const Dashboard = () => {
  const [createContactModal, setCreateContactModal] = useState(false);
  const toggleCreateContactModal = () =>
    setCreateContactModal(!createContactModal);

  const [deleteContactModal, setDeleteContactModal] = useState(false);
  const toggleDeleteContactModal = () =>
    setDeleteContactModal(!deleteContactModal);

  const { userLogout } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>();
  // const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("contact-list:token");
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      try {
        const response = await api.get<User>("/contacts");

        setContacts(response.data.contacts);
        // setUser(response.data);
      } catch (error) {
        userLogout();
      }
    })();
  }, []);

  const renderBoard = (contacts: Contact[]): ReactNode => {
    return contacts.map((contact) => (
      <Card key={contact.id} contact={contact} />
    ));
  };

  if (!contacts) {
    return (
      <main>
        <header>
          <button type="button" onClick={userLogout}>
            Sair
          </button>
        </header>
        <h2 className="colorgrey0">Carregando...</h2>
      </main>
    );
  }
  return (
    <>
      <div>
        <header>
          <button type="button" onClick={userLogout}>
            Sair
          </button>
          <button onClick={toggleCreateContactModal}>Criar Contato</button>
        </header>
        {createContactModal && (
          <ModalAddContact
            toggleModal={toggleCreateContactModal}
            setContacts={setContacts}
          />
        )}
        {/* {deleteContactModal && (
          <ModalDeleteContact
            toggleModal={toggleCreateContactModal}
            setContacts={setContacts}
          />
        )} */}
        <main>
          {contacts ? (
            <ul>{renderBoard(contacts!)}</ul>
          ) : (
            <p>Nenhum Contato Adicionado</p>
          )}
        </main>
      </div>
    </>
  );
};
