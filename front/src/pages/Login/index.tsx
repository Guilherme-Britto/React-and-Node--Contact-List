import { useForm } from "react-hook-form";
import { LoginData, schema } from "./validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { FormRegisterModal } from "../../components/FormCreateUser";

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });
  const { signIn, toggleSignUpOpenModal, isSignUpOpenModal } = useAuth();

  const renderBoard = (tasksToRender: Task[]) =>
    tasksToRender.map((task) => (
      <Card key={task.id} task={task} setTask={setTasks} />
    ));

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
            <FormRegisterModal toggleSignUpOpenModal={toggleSignUpOpenModal} />
          )}
        </div>
      </div>
    </main>
  );
};
