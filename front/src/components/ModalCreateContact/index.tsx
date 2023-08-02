import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../Modal";
import {
  contactSchemaRequestForm,
  ContactRequestForm,
  CreateContactData,
} from "./validator";
import { Dispatch } from "react";
import { Contact } from "../../pages/Dashboard/@types";
import { api } from "../../services/api";

interface FormModalProps {
  toggleModal: () => void;
  setContacts: Dispatch<React.SetStateAction<Contact[] | undefined>>;
}
export const ModalAddContact = ({
  toggleModal,
  setContacts,
}: FormModalProps) => {
  const { register, handleSubmit } = useForm<ContactRequestForm>({
    resolver: zodResolver(contactSchemaRequestForm),
  });

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

    const response = await api.post<Contact>("/contacts", contactSubmit);

    setContacts((previusContacts) => [response.data, ...previusContacts]);
    toggleModal();
    return;
  };

  // console.log(error);

  return (
    <Modal toggleModal={toggleModal}>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="name">Nome completo</label>
        <input
          type="name"
          id="name"
          placeholder="Digite aqui seu nome completo"
          {...register("name")}
        />

        <label htmlFor="email">Email principal</label>
        <input
          type="text"
          id="email1"
          placeholder="Digite seu Email"
          {...register("email1")}
        />

        <label htmlFor="email">Email secundário</label>
        <input
          type="text"
          id="email2"
          placeholder="Digite seu Email"
          {...register("email2")}
        />

        <label htmlFor="phoneNumber">Telefone principal</label>
        <input
          type="number"
          id="phoneNumber1"
          placeholder="xxxx-xxxxx"
          {...register("phoneNumber1")}
        />

        <label htmlFor="phoneNumber">Telefone secundário</label>
        <input
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
