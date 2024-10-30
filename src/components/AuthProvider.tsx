import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";


interface AuthContextType {
    user: string | null;
    loginAction: (username: string, password: string) => void;
    logOut: () => void;
  }
  
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
  }
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const loginAction = async (username: string, password: string) => {
    try {
        console.log(username, password);
      const response = await fetch("https://localhost:7099/Authentication/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username, 
            password: password,
        }),
      });
      const res = await response.json();
      console.log(res);
      if (res) {
        setUser(res.name);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};