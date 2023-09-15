import UserAuthPanel from "../components/UserAuthPanel";

const LoginSignup = () => {
  return (
    <div className="layout-container background text-main">
      <main>
        <h1>save statistics about your focus sessions with an account.</h1>
        <div className="sign-in-container">
          <UserAuthPanel />
        </div>
      </main>
    </div>
  );
};

export default LoginSignup;
