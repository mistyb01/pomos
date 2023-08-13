import { useState, useEffect } from "react";
import Timer from "./Timer";
import SettingsIcon from "./components/icons/SettingsIcon";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }, []);

  const cycle = [
    { mode: "work", minutes: 20, seconds: 0 },
    { mode: "break", minutes: 5, seconds: 0 },
    { mode: "work", minutes: 20, seconds: 0 },
    { mode: "break", minutes: 5, seconds: 0 },
    { mode: "work", minutes: 20, seconds: 0 },
  ];

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
        {/* <h2>edit cycle</h2> */}
      </section>

      <main>
        <Timer cycle={cycle} />
      </main>
    </>
  );
}

export default App;
