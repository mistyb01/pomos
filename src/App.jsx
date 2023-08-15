import { useState, useEffect } from "react";
import Timer from "./Timer";
import SettingsIcon from "./components/icons/SettingsIcon";
import CycleEditor from "./components/CycleEditor";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, []);

  const [cycleData, setCycleData] = useState({
    workMins: 25,
    workSessions: 5,
    breakMins: 5,
    longBreak: false,
    longBreakMins: 10,
  });

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
      <div
        className="settings-icon-container"
        onClick={() => setShowSettings(!showSettings)}
      >
        <SettingsIcon />
      </div>

      <section
        className={
          showSettings
            ? "settings-container settings-container-active"
            : "settings-container"
        }
      >
        <CycleEditor
          cycleData={cycleData}
          updateCycle={(newData) => setCycleData({ ...newData })}
        />
      </section>

      <main>
        <Timer cycle={cycle} />
      </main>
    </>
  );
}

export default App;
