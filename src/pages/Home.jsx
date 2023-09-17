import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Timer from "../components/Timer";
import SettingsIcon from "../components/icons/SettingsIcon";
import CycleEditor from "../components/CycleEditor";
import CloseIcon from "../components/icons/CloseIcon";

import supabase from "../config/supabaseConfig";
import StatsIcon from "../components/icons/StatsIcon";
import { Link } from "react-router-dom";

function Home({ lightModeOn, handleLightModeToggle }) {
  // test supabase
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }
  //

  const defaultPomodoro = {
    workMins: 25,
    workSessions: 4,
    breakMins: 5,
    longBreak: true,
    longBreakMins: 15,
  };

  const [cycleData, setCycleData] = useLocalStorage(
    "userDefaultCycle",
    defaultPomodoro
  );
  const [showSettings, setShowSettings] = useState(false);

  const [soundOn, setSoundOn] = useLocalStorage("soundOn", false);

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, []);

  function createCycle() {
    let cycleArr = [];
    for (let i = 0; i < cycleData.workSessions; i++) {
      cycleArr.push({ mode: "work", minutes: cycleData.workMins, seconds: 0 });
      if (i + 1 < cycleData.workSessions) {
        cycleArr.push({
          mode: "break",
          minutes: cycleData.breakMins,
          seconds: 0,
        });
      }
    }
    if (cycleData.longBreak) {
      cycleArr.push({
        mode: "longBreak",
        minutes: cycleData.longBreakMins,
        seconds: 0,
      });
    }
    return cycleArr;
  }

  const cycle = createCycle();

  return (
    <>
      <div className="ui-icon-container">
        <div
          className="settings-icon-container"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? <CloseIcon /> : <SettingsIcon />}
        </div>
        <div className="stats-icon-container">
          <Link to="/login">
            <StatsIcon />
          </Link>
        </div>
      </div>

      <section
        className={
          showSettings
            ? "settings-container background-light-2 text-main border-accent settings-container-active"
            : "settings-container background-light-2 border-accent text-main"
        }
      >
        <CycleEditor
          soundOn={soundOn}
          handleSoundToggle={(bool) => setSoundOn(bool)}
          lightModeOn={lightModeOn}
          handleLightModeToggle={(bool) => handleLightModeToggle(bool)}
          cycleData={cycleData}
          updateCycle={(newData) => setCycleData({ ...newData })}
        />
      </section>

      <div className="layout-container background">
        <main>
          <Timer cycle={cycle} soundOn={soundOn} />
        </main>
      </div>
    </>
  );
}

export default Home;