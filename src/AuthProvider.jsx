// code based on Nirmal Kumar's example:
// https://blog.openreplay.com/authentication-in-react-with-supabase/

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./config/supabaseConfig";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const signUp = (email, password) => supabase.auth.signUp({ email, password });

// when a user is logged in and finishes a timer,
// data like the timer length and when the timer was complete
// is saved to the database
const insertSession = ({ createdAt, timerLength, userId }) =>
  supabase
    .from("sessions")
    .insert([
      { created_at: createdAt, timer_length: timerLength, user_id: userId },
    ])
    .select();

// selects all of a user's sessions, to use in the statistics page
const selectSessions = (userId) =>
  supabase.from("sessions").select().eq("user_id", userId);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  // on mount, auth provider checks for an existing user session
  // and sets the relevant states accordingly
  useEffect(() => {
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

  // this context makes certain auth & user state accessible to all components
  // along with functions to interact with supabase.
  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        login,
        signOut,
        signUp,
        insertSession,
        selectSessions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
