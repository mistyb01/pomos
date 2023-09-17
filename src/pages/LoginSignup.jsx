import UserAuthPanel from "../components/UserAuthPanel";
import { useNavigate, useLocation } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toHome = () => {
    navigate("/", {
      state: {
        cIndex: location.state.cIndex,
        prevTime: location.state.prevTime,
      },
    });
  };

  return (
    <div className="layout-container background text-main">
      <main>
        <div className="sign-in-container">
          <a onClick={toHome} className="back-link border-accent">
            &lt; Back to timer
          </a>
          <h1>
            save stats about your focus sessions <br /> with an account.
          </h1>
          <UserAuthPanel />
        </div>
      </main>
    </div>
  );
};

export default LoginSignup;
