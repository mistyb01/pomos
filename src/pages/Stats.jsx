import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../components/Loading";
import HourlyChart from "../components/charts/HourlyChart";
import SevenDayChart from "../components/charts/SevenDayChart";

import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekOfYear);

const Stats = () => {
  const { auth, user, signOut, selectSessions } = useAuth();
  const navigate = useNavigate();

  const [statData, setStatData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };

  const adjustToUserTimezone = (data) => {
    const userTz = dayjs.tz.guess();
    const convertedData = data.map((entry) => ({
      ...entry,
      created_at: dayjs
        .utc(entry.created_at)
        .tz(userTz)
        .format("YYYY-MM-DDTHH:mm:ss"),
    }));
    return convertedData;
  };

  const fetchStatData = async () => {
    try {
      const { data } = await selectSessions(user.id);
      const dataAdjustedToTimezone = adjustToUserTimezone(data);
      setStatData(dataAdjustedToTimezone);
      setShowLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStatData();
    }
  }, []);

  // calculated stats values
  function formatMinsToHours(total) {
    const hours = Math.floor(total / 60);
    const leftoverMins = total % 60;
    return `${hours}h ${leftoverMins}min`;
  }

  const totalMins = () => {
    const total = statData.reduce(
      (accumulator, currentValue) => accumulator + currentValue.timer_length,
      0
    );
    return total >= 60 ? formatMinsToHours(total) : `${total}m`;
  };

  const totalMinsToday = () => {
    const total = statData
      .filter(
        (entry) =>
          entry.created_at.substring(0, 10) === dayjs().format("YYYY-MM-DD")
      )
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.timer_length,
        0
      );
    return total >= 60 ? formatMinsToHours(total) : `${total}m`;
  };

  const totalMinsThisWeek = () => {
    const currentWeek = dayjs().week();
    const total = statData
      .filter((entry) => dayjs(entry.created_at).week() === currentWeek)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.timer_length,
        0
      );
    return total >= 60 ? formatMinsToHours(total) : `${total}m`;
  };

  return (
    <div className="layout-container background text-main">
      <main>
        <div className="page-container">
          <div className="stats-options">
            <Link to="/" className="back-link border-accent">
              &lt; Back to timer
            </Link>
            <div className="stats-logout text-main">
              <p>logged in as {user.email}</p>
              <button onClick={handleLogout} className="text-accent">
                log out
              </button>
            </div>
          </div>
          <h1>Statistics</h1>
          {errorMessage && <p>{errorMessage}</p>}
          {showLoading && <Loading />}

          {!showLoading && (
            <div className="stats-container">
              <section className="stats-section">
                <h2 className="text-accent">How long you've focused</h2>
                <ul className="stats-value-list">
                  <li className="stats-value-item background-light-2">
                    <span class="stats-value text-emphasize">
                      {totalMinsToday()}
                    </span>{" "}
                    today
                  </li>
                  <li className="stats-value-item background-light-2">
                    <span class="stats-value text-emphasize">
                      {totalMinsThisWeek()}
                    </span>
                    this week
                  </li>
                  <li className="stats-value-item background-light-2">
                    <span class="stats-value text-emphasize">
                      {totalMins()}
                    </span>{" "}
                    total
                  </li>
                </ul>
              </section>

              <section className="stats-section">
                <h2 className="text-accent">Last 7 days</h2>
                <SevenDayChart data={statData} />
              </section>

              <section className="stats-section">
                <h2 className="text-accent">Your activity by the hour</h2>
                <HourlyChart data={statData} />
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Stats;
