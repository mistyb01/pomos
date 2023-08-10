import { useState, useEffect } from "react";
import dayjs from "dayjs";

import PlayIcon from "./components/icons/PlayIcon";
import PauseIcon from "./components/icons/PauseIcon";
import ForwardIcon from "./components/icons/ForwardIcon";
import ReplayIcon from "./components/icons/ReplayIcon";

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
    <div className="timer-and-buttons-container">
      <h2>
        {initialTime.mode} mode. {cycleIndex + 1} / {cycle.length}
      </h2>
      <div className="timer-container">
        {remainingTime
          ? `${remainingTime.minutes}:${remainingTime.seconds
              .toString()
              .padStart(2, "0")}`
          : `${initialTime.minutes}:${initialTime.seconds
              .toString()
              .padStart(2, "0")}`}

        <div className="timer-button-container">
          <button
            className="timer-button timer-button__reset"
            onClick={handleTimerReset}
          >
            <ReplayIcon />
            {/* reset timer */}
          </button>

          <button
            className="timer-button timer-button__play"
            onClick={handleTimerStart}
          >
            {timerActive ? <PauseIcon /> : <PlayIcon />}
            {/* {timerActive ? "pause" : "start"} timer */}
          </button>

          {cycleIndex + 1 < cycle.length && (
            <button
              className="timer-button timer-button__skip"
              onClick={handleTimerNext}
            >
              <ForwardIcon />
              {/* skip this session */}
            </button>
          )}
        </div>
      </div>

      <div className="option-container">
        <button className="option-button" onClick={() => {}}>
          turn on sound
        </button>

        {cycleIndex !== 0 && (
          <button className="option-button" onClick={handleCycleReset}>
            restart cycle
          </button>
        )}
      </div>

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
    </div>
  );
}

export default Timer;
