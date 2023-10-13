import { useState } from "react";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const SignUp = () => {
  const { signUp } = useAuth();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const completeSignup = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    setError(null);
    try {
      const {
        data: { user, session },
        error,
      } = await signUp(userEmail, userPassword);
      if (user && session) {
        navigate("/");
      }
      if (error) {
        setError(error.message);
      }
      setShowLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={completeSignup} className="sign-in-form">
      {error && <p className="text-highlight">Error: {error}</p>}
      {showLoading && (
        <div className="center-container">
          <Loading />
        </div>
      )}
      {
        <>
          <div>
            <label htmlFor="email" className="text-bold">
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={(e) => setUserEmail(e.target.value)}
              className="border"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setUserPassword(e.target.value)}
              className="border"
            />
          </div>

          <button
            type="submit"
            className="sign-in-button background-light-2 text-main"
          >
            Sign up
          </button>
        </>
      }
    </form>
  );
};

export default SignUp;
