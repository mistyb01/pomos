import Login from "./components/form/Login";
import SignUp from "./components/form/SignUp";
import { useState } from "react";

const UserAuthPanel = () => {
  const [mode, setMode] = useState("");

  return (
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
  );
};

export default UserAuthPanel;
