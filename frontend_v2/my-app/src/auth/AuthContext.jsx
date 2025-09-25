import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as apiLogin, logout as apiLogout, register as apiRegister } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // On initial load, ask backend who we are (via cookie session or valid token)
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch {}
      setBooting(false);
    })();
  }, []);

  const login = async (email, password) => {
    await apiLogin({ email, password });
    const me = await getMe(); // re-fetch identity after login
    setUser(me);
  };

  const register = async (form) => {
    await apiRegister(form);
    const me = await getMe();
    setUser(me);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, booting, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);