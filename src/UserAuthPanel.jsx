import Login from "./components/form/Login";
import SignUp from "./components/form/SignUp";
import { useState, useEffect } from "react";
import supabase from "./config/supabaseConfig";

const UserAuthPanel = () => {
  const [mode, setMode] = useState("");
  const [sessionExists, setSessionExists] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  useEffect(() => {
    const checkForCurrentSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
      }
      if (data) {
        setSessionExists(true);
        console.log(data);
        setCurrentUserEmail(data.session.user.email);
      }
    };
    checkForCurrentSession();
  }, []);

  return (
    <>
      {!sessionExists && (
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
      {sessionExists && (
        <div className="text-main">
          <p>logged in as {currentUserEmail}</p>
          <button className="text-main">log out</button>
        </div>
      )}
    </>
  );
};

export default UserAuthPanel;
