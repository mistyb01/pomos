import { useState } from "react";
import supabase from "../../config/supabaseConfig";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [error, setError] = useState(null);

  const completeLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });
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
      <form onSubmit={completeLogin} className="sign-in-form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="text-main">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
