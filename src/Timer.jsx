import { useState, useEffect } from "react";
import dayjs from "dayjs";

function Timer({ startMin, startSecs }) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(null);

  const initialSettings = {
    minutes: startMin,
    seconds: startSecs,
  };

  const [remainingTime, setRemainingTime] = useState(initialSettings);

  useEffect(() => {
    let id;
    let remainingTimeMins;
    let remainingTimeSecs;

    if (timerActive) {
      id = setInterval(() => {
        let currentTime = dayjs();
        let diffInSecs = currentTime.diff(timerStartTime, "seconds");

        const initialInSecs =
          remainingTime.minutes * 60 + remainingTime.seconds;
        const remainingInSecs = initialInSecs - diffInSecs;

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
  }, [timerActive, timerStartTime]);

  function handleTimerStart() {
    setTimerStartTime(dayjs()); // set to current time, from dayJS
    setTimerActive(!timerActive);
  }

  function handleTimerReset() {
    setTimerStartTime(dayjs()); // set to current time, from dayJS
    setRemainingTime(initialSettings);
  }

  return (
    <>
      <div className="timer-container">
        {remainingTime.minutes}:
        {remainingTime.seconds.toString().padStart(2, "0")}
      </div>

      <button onClick={handleTimerStart}>
        {timerActive ? "pause" : "start"} timer
      </button>

      <button onClick={handleTimerReset}>reset</button>
    </>
  );
}

export default Timer;
