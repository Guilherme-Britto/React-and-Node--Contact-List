import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../Modal";

import { Contact } from "../../pages/Dashboard/@types";
import { api } from "../../services/api";
import { Dispatch } from "react";
import {
  ContactRequestForm,
  CreateContactData,
  contactSchemaRequestForm,
} from "../ModalCreateContact/validator";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalUpdateContactProps {
  toggleModal: () => void;
  contact: Contact | undefined;
  contacts: Contact[] | undefined;
  setContacts: Dispatch<React.SetStateAction<Contact[] | undefined>>;
}
export const ModalUpdateContact = ({
  toggleModal,
  contact,
  setContacts,
  contacts,
}: ModalUpdateContactProps) => {
  const { register, handleSubmit } = useForm<ContactRequestForm>({
    resolver: zodResolver(contactSchemaRequestForm),
  });
  const useContact = {
    email1: "",
    email2: "",
    phoneNumber1: "",
    phoneNumber2: "",
  };
  const fillUseContact = () => {
    if (contact!.email[0]) {
      useContact.email1 = contact!.email[0];
    }
    if (contact!.email[1]) {
      useContact.email2 = contact!.email[1];
    }
    if (contact!.phoneNumber[0]) {
      useContact.phoneNumber1 = contact!.phoneNumber[0];
    }
    if (contact!.phoneNumber[1]) {
      useContact.phoneNumber2 = contact!.phoneNumber[1];
    }
  };
  fillUseContact();

  const submit: SubmitHandler<ContactRequestForm> = async (formData) => {
    if (!formData.name) {
      return alert("Nome é obrigatório");
    }
    function isValidEmail(email: string) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]*$/i;
      return emailPattern.test(email);
    }
    if (formData.email1) {
      if (!isValidEmail(formData.email1)) {
        return alert("Email principal não é valido");
      }
    }
    if (formData.email2) {
      if (!isValidEmail(formData.email2)) {
        return alert("Email secundário não é valido");
      }
    }

    if (formData.phoneNumber1) {
      if (formData.phoneNumber1.toString().length !== 9) {
        alert("O telefone principal deve conter 9 dígitos");
        return;
      }
    }

    if (formData.phoneNumber1) {
      if (formData.phoneNumber1.toString().length !== 9) {
        alert("O telefone secundário deve conter 9 dígitos");
        return;
      }
    }

    const contactSubmit: CreateContactData = {
      name: formData.name,
      email: [],
      phoneNumber: [],
    };

    if (formData.email1) {
      contactSubmit.email.push(formData.email1);
    }
    if (formData.email2) {
      contactSubmit.email.push(formData.email2);
    }
    if (formData.phoneNumber1 != 0) {
      contactSubmit.phoneNumber.push(formData.phoneNumber1);
    }
    if (formData.phoneNumber2 != 0) {
      contactSubmit.phoneNumber.push(formData.phoneNumber2);
    }

    const response = await api.patch<Contact>(
      `/contacts/${contact?.id}`,
      contactSubmit
    );

    const newContacts = contacts!.map((oldContact) => {
      if (oldContact!.id === response.data.id) {
        return { ...contact, ...response.data };
      } else {
        return oldContact;
      }
    });

    setContacts(newContacts);
    toggleModal();
    return;
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="name">Nome completo</label>
        <input
          defaultValue={contact!.name}
          type="name"
          id="name"
          placeholder="Digite aqui seu nome completo"
          {...register("name")}
        />

        <label htmlFor="email">Email principal</label>
        <input
          defaultValue={useContact.email1}
          type="text"
          id="email1"
          placeholder="Digite seu Email"
          {...register("email1")}
        />

        <label htmlFor="email">Email secundário</label>
        <input
          defaultValue={useContact.email2}
          type="text"
          id="email2"
          placeholder="Digite seu Email"
          {...register("email2")}
        />

        <label htmlFor="phoneNumber">Telefone principal</label>
        <input
          defaultValue={useContact.phoneNumber1}
          type="number"
          id="phoneNumber1"
          placeholder="xxxx-xxxxx"
          {...register("phoneNumber1")}
        />

        <label htmlFor="phoneNumber">Telefone secundário</label>
        <input
          defaultValue={useContact.phoneNumber2}
          type="number"
          id="phoneNumber2"
          placeholder="xxxx-xxxxx"
          {...register("phoneNumber2")}
        />

        <button type="submit">Salvar</button>
      </form>
    </Modal>
  );
};
