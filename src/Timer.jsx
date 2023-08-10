import { useState, useEffect } from "react";
import dayjs from "dayjs";

function Timer({ cycle }) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [cycleIndex, setCycleIndex] = useState(0);

  const initialTime = cycle[cycleIndex];
  const [remainingTime, setRemainingTime] = useState(null);

  const [isCycleComplete, setIsCycleComplete] = useState(false);

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
          setTimerActive(false);
          if (cycleIndex + 1 < cycle.length) {
            handleTimerNext();
          } else {
            // reached end of cycle
            setIsCycleComplete(true);
          }
        }
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [timerActive, timerStartTime, cycleIndex]);

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

  function handleCycleReset() {
    setCycleIndex(0);
    setRemainingTime(null);
    setIsCycleComplete(false);
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

      <button onClick={handleTimerReset}>reset timer</button>

      <br />
      <br />

      {cycleIndex + 1 < cycle.length && (
        <button onClick={handleTimerNext}>skip this session</button>
      )}

      <br />
      <br />

      {cycleIndex !== 0 && (
        <button onClick={handleCycleReset}>start over cycle</button>
      )}

      {isCycleComplete && (
        <>
          <h3>you finished!</h3>
          <p>
            total work time:
            {cycle
              .filter((session) => session.mode === "work")
              .reduce(
                (accumulator, currentValue) =>
                  accumulator +
                  currentValue.minutes +
                  currentValue.seconds / 60,
                0
              )}
          </p>
          <p>
            total break time:
            {cycle
              .filter(
                (session) =>
                  session.mode === "break" || session.mode === "long break"
              )
              .reduce(
                (accumulator, currentValue) =>
                  accumulator +
                  currentValue.minutes +
                  currentValue.seconds / 60,
                0
              )}
          </p>
          <p>
            total time overall:
            {cycle.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.minutes + currentValue.seconds / 60,
              0
            )}
          </p>
        </>
      )}
    </>
  );
}

export default Timer;
