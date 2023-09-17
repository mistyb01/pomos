import { useAuth } from "../AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

const Stats = () => {
  const { auth, user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await signOut();
    if (error) {
      console.log(error);
    } else {
      toHome();
    }
  };

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
          <h1>stats</h1>
          {auth && (
            <div className="text-main">
              <p>logged in as {user.email}</p>
              <button onClick={handleLogout} className="text-main">
                log out
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Stats;
