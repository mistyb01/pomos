import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Stats = () => {
  const { auth, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="layout-container background text-main">
      <main>
        <div className="sign-in-container">
          <Link to="/" className="back-link border-accent">
            &lt; Back to timer
          </Link>
          <h1>stats</h1>
          {auth && (
            <div className="text-main">
              <p>logged in as {user.email}</p>
              <button onClick={handleLogout} className="text-main">
                log out
              </button>
              <section className="stats-section">
                <ul>
                  <li>mins today</li>
                  <li>mins this week</li>
                  <li>mins total</li>
                </ul>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Stats;
