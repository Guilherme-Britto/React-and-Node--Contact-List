import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginData } from "../../pages/Login/validator";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { CreateUserData } from "../../components/FormCreateUser/validator";

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  token: string;
}

interface AuthContextValues {
  signIn: (data: LoginData) => Promise<void>;
  signUp: (data: CreateUserData) => Promise<void>;
  toggleSignUpOpenModal: () => void;
  isSignUpOpenModal: boolean;
  userLogout: () => void;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextValues);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isSignUpOpenModal, setIsSignUpOpenModal] = useState(false);
  const toggleSignUpOpenModal = () => setIsSignUpOpenModal(!isSignUpOpenModal);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("your-todolist:token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const signIn = async (data: LoginData) => {
    try {
      const response = await api.post<LoginResponse>("/login", data);

      const { token } = response.data;

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      localStorage.setItem("your-todolist:token", token);
      setLoading(false);

      navigate("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (data: CreateUserData) => {
    try {
      console.log("dsdwssd");

      await api.post<CreateUserData>("/users", data);

      toggleSignUpOpenModal();
    } catch (error) {
      alert("Email já cadastrado!");
    }
  };

  const userLogout = (): void => {
    localStorage.removeItem("your-todolist:token");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        loading,
        userLogout,
        toggleSignUpOpenModal,
        isSignUpOpenModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
