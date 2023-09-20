import UserAuthPanel from "../components/UserAuthPanel";
import { Link } from "react-router-dom";

const LoginSignup = () => {
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
          <UserAuthPanel />
        </div>
      </main>
    </div>
  );
};

export default LoginSignup;
