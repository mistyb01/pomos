import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://obggskkuzhoatsjtvzbb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iZ2dza2t1emhvYXRzanR2emJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2NTU2ODMsImV4cCI6MjAxMDIzMTY4M30.0FnEH5IZfhofx23QMVebGfeYqANqKtl0wkVx5jUVr1E"
);

import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Timer from "./Timer";
import SettingsIcon from "./components/icons/SettingsIcon";
import LightModeIcon from "./components/icons/LightModeIcon";
import DarkModeIcon from "./components/icons/DarkModeIcon";
import CycleEditor from "./components/CycleEditor";
import CloseIcon from "./components/icons/CloseIcon";

function App() {
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

  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  const [cycleData, setCycleData] = useLocalStorage(
    "userDefaultCycle",
    defaultPomodoro
  );
  const [showSettings, setShowSettings] = useState(false);
  const [lightModeOn, setLightModeOn] = useLocalStorage(
    "lightModeOn",
    prefersLight
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

  return (
    <div
      className={
        lightModeOn ? "light overall-container" : "dark overall-container"
      }
    >
      <div
        className="settings-icon-container"
        onClick={() => setShowSettings(!showSettings)}
      >
        {showSettings ? <CloseIcon /> : <SettingsIcon />}
      </div>

      <div
        className="lightmode-icon-container"
        onClick={() => setLightModeOn(!lightModeOn)}
      >
        {lightModeOn ? <LightModeIcon /> : <DarkModeIcon />}
      </div>

      <section
        className={
          showSettings
            ? "settings-container background-light-2 text-main border-accent settings-container-active"
            : "settings-container background-light-2 border-accent text-main"
        }
      >
        <CycleEditor
          cycleData={cycleData}
          updateCycle={(newData) => setCycleData({ ...newData })}
        />
      </section>

      <div className="layout-container background">
        <main>
          <Timer cycle={cycle} />
        </main>
      </div>
    </div>
  );
}

export default App;
