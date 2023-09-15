import Login from "./components/form/Login";
import SignUp from "./components/form/SignUp";
import { useState, useEffect } from "react";
import supabase from "./config/supabaseConfig";

const UserAuthPanel = () => {
  const [mode, setMode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        setCurrentUser(session.user);
        setLoggedIn(true);
      } else if (event === "SIGNED_OUT") {
        setCurrentUser(null);
        setLoggedIn(false);
      }
    });

    const checkForCurrentSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
      }
      if (data.session) {
        setLoggedIn(true);
        setCurrentUser(data.session.user);
      }
    };
    checkForCurrentSession();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      {!loggedIn && (
        <>
          <div className="user-auth-buttons">
            <button
              className={mode === "login" ? "text-main" : "text-light"}
              onClick={(e) => setMode("login")}
            >
              login
            </button>
            <button
              className={mode === "signup" ? "text-main" : "text-light"}
              onClick={(e) => setMode("signup")}
            >
              signup
            </button>
          </div>
          <div className="text-main">
            {mode === "signup" && <SignUp />}
            {mode === "login" && <Login />}
          </div>
        </>
      )}
      {loggedIn && (
        <div className="text-main">
          <p>logged in as {currentUser.email}</p>
          <button onClick={handleLogout} className="text-main">
            log out
          </button>
        </div>
      )}
    </>
  );
};

export default UserAuthPanel;
