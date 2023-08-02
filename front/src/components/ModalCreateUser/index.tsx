import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateUserData,
  userRequestForm,
  userSchemaRequestForm,
} from "./validator";
import { Modal } from "../Modal";

interface FormRegisterModalProps {
  toggleSignUpOpenModal: () => void;
}
export const ModalRegister = ({
  toggleSignUpOpenModal,
}: FormRegisterModalProps) => {
  const { register, handleSubmit } = useForm<userRequestForm>({
    resolver: zodResolver(userSchemaRequestForm),
  });
  const { signUp } = useAuth();

  const submit: SubmitHandler<userRequestForm> = (formData) => {
    if (formData.password !== formData.passwordConfirmation) {
      alert("As senhas precisam ser iguais");
      return;
    }

    if (formData.phoneNumber.toString().length !== 9) {
      alert("O número de telefone deve conter 9 dígitos");
      return;
    }

    const submitData: CreateUserData = { ...formData };
    delete submitData.passwordConfirmation;

    signUp(formData);
  };

  return (
    <Modal toggleModal={toggleSignUpOpenModal}>
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="name">Nome completo</label>
        <input
          type="name"
          id="name"
          placeholder="Digite aqui seu nome completo"
          {...register("name")}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu Email"
          {...register("email")}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          {...register("password")}
        />

        <label htmlFor="passwordConfirmation">Confirmação da senha</label>
        <input
          type="password"
          id="passwordConfirmation"
          placeholder="Digite sua senha novamente"
          {...register("passwordConfirmation")}
        />

        <label htmlFor="phoneNumber">Telefone</label>
        <input
          type="number"
          id="phoneNumber"
          placeholder="xxxx-xxxxx"
          {...register("phoneNumber")}
        />

        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  );
};
