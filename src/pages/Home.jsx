import { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import Timer from "../components/Timer";
import CycleEditor from "../components/CycleEditor";
import IconMenu from "../components/IconMenu";

function Home({
  lightModeOn,
  handleLightModeToggle,
  cycleData,
  handleSetCycleData,
  cycleIndex,
  handleSetCycleIndex,
  remainingTime,
  handleSetRemainingTime,
}) {
  const [soundOn, setSoundOn] = useLocalStorage("soundOn", false);
  const [showSettings, setShowSettings] = useState(false);

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
      <IconMenu
        showSettings={showSettings}
        toggleShowSettings={() => setShowSettings(!showSettings)}
      />
      <CycleEditor
        showSettings={showSettings}
        soundOn={soundOn}
        handleSoundToggle={(bool) => setSoundOn(bool)}
        lightModeOn={lightModeOn}
        handleLightModeToggle={(bool) => handleLightModeToggle(bool)}
        cycleData={cycleData}
        updateCycle={(newData) => handleSetCycleData({ ...newData })}
      />

      <div className="layout-container background">
        <main>
          <Timer
            cycle={cycle}
            soundOn={soundOn}
            remainingTime={remainingTime}
            handleSetRemainingTime={handleSetRemainingTime}
            cycleIndex={cycleIndex}
            handleSetCycleIndex={handleSetCycleIndex}
          />
        </main>
      </div>
    </>
  );
}

export default Home;
