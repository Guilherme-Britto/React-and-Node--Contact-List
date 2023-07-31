import { useAuth } from "../../hooks/useAuth";

export const Dashboard = () => {
  const { userLogout } = useAuth();

  return (
    <main>
      <div>
        <h2>Dashboard</h2>
        <button onClick={() => userLogout()}>Sair</button>
      </div>
    </main>
  );
};
