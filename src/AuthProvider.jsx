// code based on Nirmal Kumar: https://blog.openreplay.com/authentication-in-react-with-supabase/

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./config/supabaseConfig";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const signUp = (email, password) => supabase.auth.signUp({ email, password });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkForCurrentSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
      }
      if (data.session) {
        setAuth(true);
        setUser(data.session.user);
      }
    };
    checkForCurrentSession();

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, login, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
