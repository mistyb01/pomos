import { useState } from "react";
import { useAuth } from "../../AuthProvider";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { login } = useAuth();

  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await login(userEmail, userPassword);
    if (data) {
      console.log(data);
      setError(null);
    }
    if (error) {
      setError("there was an error.");
      console.log(error);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin} className="sign-in-form">
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
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
