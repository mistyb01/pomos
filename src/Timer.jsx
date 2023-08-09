import { useState, useEffect } from "react";
import dayjs from "dayjs";

function Timer({ cycle }) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [cycleIndex, setCycleIndex] = useState(0);

  const initialTime = cycle[cycleIndex];
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    let id;
    let remainingTimeMins;
    let remainingTimeSecs;

    if (timerActive) {
      id = setInterval(() => {
        let currentTime = dayjs();
        let diffInSecs = currentTime.diff(timerStartTime, "seconds");

        let initialInSecs;
        if (!remainingTime) {
          initialInSecs = initialTime.minutes * 60 + initialTime.seconds;
        } else {
          initialInSecs = remainingTime.minutes * 60 + remainingTime.seconds;
        }

        let remainingInSecs = initialInSecs - diffInSecs;

        remainingTimeSecs = remainingInSecs % 60;
        remainingTimeMins = Math.floor(remainingInSecs / 60);

        setRemainingTime({
          minutes: remainingTimeMins,
          seconds: remainingTimeSecs,
        });

        if (remainingTimeMins === 0 && remainingTimeSecs === 0) {
          setTimerActive(!timerActive);
        }
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [timerActive, timerStartTime, cycleIndex, remainingTime]);

  function handleTimerStart() {
    setTimerStartTime(dayjs()); // set to current time, from dayJS
    setTimerActive(!timerActive);
  }

  function handleTimerReset() {
    setTimerStartTime(dayjs()); // set to current time, from dayJS
    setRemainingTime(cycle[cycleIndex]);
  }

  function handleTimerNext() {
    setTimerStartTime(dayjs()); // set to current time, from dayJS
    setCycleIndex((c) => c + 1);
    setRemainingTime(null);
  }

  return (
    <>
      <div className="timer-container">
        {remainingTime
          ? `${remainingTime.minutes}:${remainingTime.seconds
              .toString()
              .padStart(2, "0")}`
          : `${initialTime.minutes}:${initialTime.seconds
              .toString()
              .padStart(2, "0")}`}
      </div>

      <h3>{initialTime.mode} mode</h3>
      <h4>
        session {cycleIndex + 1} / {cycle.length}
      </h4>
      <button onClick={handleTimerStart}>
        {timerActive ? "pause" : "start"} timer
      </button>

      <button onClick={handleTimerReset}>reset</button>

      {cycleIndex + 1 < cycle.length && (
        <button onClick={handleTimerNext}>skip</button>
      )}
    </>
  );
}

export default Timer;
