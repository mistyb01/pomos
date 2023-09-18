import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import Timer from "../components/Timer";
import SettingsIcon from "../components/icons/SettingsIcon";
import CycleEditor from "../components/CycleEditor";
import CloseIcon from "../components/icons/CloseIcon";

import StatsIcon from "../components/icons/StatsIcon";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../AuthProvider";

function Home({
  lightModeOn,
  handleLightModeToggle,
  cycleData,
  handleSetCycleData,
  children,
}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showSettings, setShowSettings] = useState(false);
  const [soundOn, setSoundOn] = useLocalStorage("soundOn", false);

  // for Timer
  const [cycleIndex, setCycleIndex] = useState(
    // if there's state stored in location object (which happens when coming from another page)
    // use the stored cIndex state. otherwise, just use 0.
    location.state ? location.state.cIndex : 0
  );
  const [remainingTime, setRemainingTime] = useState(
    location.state ? location.state.prevTime : null
  );

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

  // these functions are for passing timer state to routes,
  // so the state can be passed back to home, and persist between page navigation.
  const toRoute = (route) => {
    navigate(route, {
      state: { cIndex: cycleIndex, prevTime: remainingTime },
    });
  };

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
          {auth && (
            <a onClick={() => toRoute("/stats")}>
              <StatsIcon />
            </a>
          )}
          {!auth && (
            <a onClick={() => toRoute("/login")}>
              <StatsIcon />
            </a>
          )}
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
          updateCycle={(newData) => handleSetCycleData({ ...newData })}
        />
      </section>

      <div className="layout-container background">
        <main>{children}</main>
      </div>
    </>
  );
}

export default Home;
