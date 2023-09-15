const SignUp = () => {
  return (
    <>
      <form className="sign-in-form">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" />
        </div>

        <button type="submit" className="text-main">
          Sign up
        </button>
      </form>
    </>
  );
};

export default SignUp;
