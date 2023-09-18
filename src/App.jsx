import { useLocalStorage } from "@uidotdev/usehooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// pages
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Stats from "./pages/Stats";

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

function App() {
  const [lightModeOn, setLightModeOn] = useLocalStorage(
    "lightModeOn",
    prefersLight
  );

  // for Timer
  const [cycleIndex, setCycleIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(null);

  return (
    <div
      className={
        lightModeOn ? "light overall-container" : "dark overall-container"
      }
    >
      <Router basename="/pomos">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                lightModeOn={lightModeOn}
                handleLightModeToggle={(bool) => setLightModeOn(bool)}
                cycleIndex={cycleIndex}
                handleSetCycleIndex={(val) => setCycleIndex(val)}
                remainingTime={remainingTime}
                handleSetRemainingTime={(val) => setRemainingTime(val)}
              />
            }
          />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
