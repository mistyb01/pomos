import { useLocalStorage } from "@uidotdev/usehooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Stats from "./pages/Stats";

// Home components

const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

function App() {
  const [lightModeOn, setLightModeOn] = useLocalStorage(
    "lightModeOn",
    prefersLight
  );

  // timer state
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
                cycleData={cycleData}
                handleSetCycleData={(val) => setCycleData(val)}
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
