import Login from "./form/Login";
import SignUp from "./form/SignUp";
import { useState } from "react";
import { useAuth } from "../AuthProvider";

const UserAuthPanel = () => {
  const [mode, setMode] = useState("login");
  const { auth, user, signOut } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await signOut();
    if (error) console.log(error);
  };

  return (
    <>
      {!auth && (
        <>
          <div className="user-auth-buttons">
            <button
              className={
                mode === "login"
                  ? "user-auth-tab user-auth-tab-active border-bottom text-main"
                  : "user-auth-tab text-light"
              }
              onClick={(e) => setMode("login")}
            >
              login
            </button>
            <button
              className={
                mode === "signup"
                  ? "user-auth-tab user-auth-tab-active border-bottom text-main"
                  : "user-auth-tab text-light"
              }
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
      {auth && (
        <div className="text-main">
          <p>logged in as {user.email}</p>
          <button onClick={handleLogout} className="text-main">
            log out
          </button>
        </div>
      )}
    </>
  );
};

export default UserAuthPanel;
