import { useState } from "react";
import supabase from "../../config/supabaseConfig";
import { useAuth } from "../../AuthProvider";

const SignUp = () => {
  const { signUp } = useAuth();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [error, setError] = useState(null);

  const completeSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await signUp(userEmail, userPassword);
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
      <form onSubmit={completeSignup} className="sign-in-form">
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
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignUp;
