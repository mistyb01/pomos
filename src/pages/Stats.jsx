import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import Loading from "../components/Loading";
import HourlyChart from "../components/charts/HourlyChart";

dayjs.extend(weekOfYear);

const Stats = () => {
  const { auth, user, signOut, selectSessions, getHourlyMinutes } = useAuth();
  const navigate = useNavigate();

  const [statData, setStatData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [hourlyData, setHourlyData] = useState([]);

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
      setStatData(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchHourlyData = async () => {
    try {
      const { data } = await getHourlyMinutes(user.id);
      console.log("hourly", data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStatData();
      fetchHourlyData();
      totalMinsThisWeek();
      setShowLoading(false);
    }
  }, []);

  // calculated stats values

  const totalMins = statData.reduce(
    (accumulator, currentValue) => accumulator + currentValue.timer_length,
    0
  );

  const totalMinsToday = statData
    .filter(
      (entry) =>
        entry.created_at.substring(0, 10) === dayjs().format("YYYY-MM-DD")
    )
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.timer_length,
      0
    );

  const totalMinsThisWeek = () => {
    const currentWeek = dayjs().week();

    return statData
      .filter((entry) => dayjs(entry.created_at).week() === currentWeek)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.timer_length,
        0
      );
  };

  return (
    <div className="layout-container background text-main">
      <main>
        <div className="page-container">
          <div className="stats-options">
            <Link to="/" className="back-link border-accent">
              &lt; Back to timer
            </Link>
            <div className="stats-logout text-accent">
              <p>logged in as {user.email}</p>
              <button onClick={handleLogout} className="text-main">
                log out
              </button>
            </div>
          </div>
          <h1>Statistics</h1>
          {errorMessage && <p>{errorMessage}</p>}
          {showLoading && <Loading />}

          {!showLoading && (
            <>
              <section className="stats-section text-main">
                <ul className="stats-value-list">
                  <li className="stats-value-item background-light-2">
                    <span class="stats-value text-emphasize">
                      {totalMinsToday} min
                    </span>{" "}
                    today
                  </li>
                  <li className="stats-value-item background-light-2">
                    <span class="stats-value text-emphasize">
                      {totalMinsThisWeek()} min
                    </span>
                    this week
                  </li>
                  <li className="stats-value-item background-light-2">
                    <span class="stats-value text-emphasize">
                      {totalMins} min
                    </span>{" "}
                    total
                  </li>
                </ul>
              </section>

              <section className="chart">
                <HourlyChart />
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Stats;
