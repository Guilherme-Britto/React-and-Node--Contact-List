import { useForm } from "react-hook-form";
import { LoginData, schema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { ModalRegister } from "../../components/ModalCreateUser";

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });
  const { signIn, toggleSignUpOpenModal, isSignUpOpenModal } = useAuth();

  return (
    <main>
      <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit(signIn)}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" {...register("password")} />

          <button type="submit">Entrar</button>
        </form>
        <button onClick={toggleSignUpOpenModal}>Criar Usuário</button>
      </div>
      <div>
        <div className="modalDiv">
          {isSignUpOpenModal && (
            <ModalRegister toggleSignUpOpenModal={toggleSignUpOpenModal} />
          )}
        </div>
      </div>
    </main>
  );
};
