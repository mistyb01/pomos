import { Link } from "react-router-dom";
import Login from "../components/form/Login";
import SignUp from "../components/form/SignUp";
import { useState } from "react";
import { useAuth } from "../AuthProvider";

const LoginSignup = () => {
  const [mode, setMode] = useState("login");
  const { auth } = useAuth();

  return (
    <div className="layout-container background text-main">
      <main>
        <div className="page-container">
          <Link to="/" className="back-link border-accent">
            &lt; Back to timer
          </Link>
          <h1>
            save stats about your focus sessions <br /> with an account.
          </h1>
          {!auth && (
            <>
              <div className="user-auth-buttons">
                <button
                  className={
                    mode === "login"
                      ? "user-auth-tab user-auth-tab-active border-bottom text-main"
                      : "user-auth-tab text-light"
                  }
                  onClick={() => setMode("login")}
                >
                  login
                </button>
                <button
                  className={
                    mode === "signup"
                      ? "user-auth-tab user-auth-tab-active border-bottom text-main"
                      : "user-auth-tab text-light"
                  }
                  onClick={() => setMode("signup")}
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
        </div>
      </main>
    </div>
  );
};

export default LoginSignup;
