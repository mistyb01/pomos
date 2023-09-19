import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const Stats = () => {
  const { auth, user, signOut, selectSessions } = useAuth();
  const navigate = useNavigate();

  const [statData, setStatData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // calculated stats values
  let totalMins = 0;

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };

  const fetchStatData = async () => {
    try {
      const { data } = await selectSessions(user.id);
      console.log("data", data);
      setStatData(data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStatData();
    }
  }, []);

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
                  <li>
                    {statData
                      .filter(
                        (entry) =>
                          entry.created_at.substring(0, 10) ===
                          dayjs().format("YYYY-MM-DD")
                      )
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue.timer_length,
                        0
                      )}
                    mins today
                  </li>
                  <li>mins this week</li>
                  <li>
                    {statData.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.timer_length,
                      0
                    )}
                    mins total
                  </li>
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
