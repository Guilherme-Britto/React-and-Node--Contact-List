import { useContext } from "react";
import { AuthContext } from "../providers/User/AuthProvider";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
