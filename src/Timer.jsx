import { useState, useEffect } from "react";
import dayjs from "dayjs";

import SoundOffIcon from "./components/icons/SoundOffIcon";
import SoundOnIcon from "./components/icons/SoundOnIcon";
import RestartCycleIcon from "./components/icons/RestartCycleIcon";

import useSound from "use-sound";
import WorkFanfare from "./sounds/work_timer_fanfare.wav";
import BreakEndSfx from "./sounds/break_end.mp3";
import CycleEndSfx from "./sounds/cycle_end.mp3";
import FinishMessage from "./components/FinishMessage";
import TimerButtonGroup from "./components/TimerButtonGroup";

function Timer({ cycle }) {
  const [playWorkFanfare] = useSound(WorkFanfare, {
    volume: 1,
  });
  const [playBreakEnd] = useSound(BreakEndSfx, { volume: 1 });
  const [playCycleEnd] = useSound(CycleEndSfx, { volume: 1 });

  const [timerActive, setTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [cycleIndex, setCycleIndex] = useState(0);

  const initialTime = cycle[cycleIndex];
  const [remainingTime, setRemainingTime] = useState(null);

  const [soundOn, setSoundOn] = useState(false);
  const [isCycleComplete, setIsCycleComplete] = useState(false);
  const hasNextSession = cycleIndex + 1 < cycle.length;

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
          if (soundOn && initialTime.mode === "work") {
            playWorkFanfare();
          } else if (soundOn && initialTime.mode === "break") {
            playBreakEnd();
          }
          setTimerActive(false);
          if (cycleIndex + 1 < cycle.length) {
            handleTimerNext();
          } else {
            // reached end of cycle
            playCycleEnd();
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
    setTimerStartTime(dayjs());
    setTimerActive(!timerActive);
  }

  function handleTimerReset() {
    setTimerStartTime(dayjs());
    setRemainingTime(cycle[cycleIndex]);
  }

  function handleTimerNext() {
    setTimerStartTime(dayjs());
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
      {!isCycleComplete && (
        <>
          <div className="cycle-heading">
            <h2>{initialTime.mode}.</h2>
            <h3>
              {cycleIndex + 1} / {cycle.length}
            </h3>
          </div>

          <div className="timer-container">
            {remainingTime
              ? `${remainingTime.minutes}:${remainingTime.seconds
                  .toString()
                  .padStart(2, "0")}`
              : `${initialTime.minutes}:${initialTime.seconds
                  .toString()
                  .padStart(2, "0")}`}

            <TimerButtonGroup
              resetTimer={handleTimerReset}
              startTimer={handleTimerStart}
              nextTimer={handleTimerNext}
              timerActive={timerActive}
              hasNextSession={hasNextSession}
            />
          </div>
        </>
      )}

      {isCycleComplete && <FinishMessage cycle={cycle} />}

      <div className="option-container">
        <button
          className="option-button"
          onClick={() => {
            setSoundOn(!soundOn);
          }}
        >
          {soundOn ? (
            <>
              <SoundOnIcon /> sound on
            </>
          ) : (
            <>
              <SoundOffIcon /> sound off
            </>
          )}
        </button>

        {cycleIndex !== 0 && (
          <button className="option-button" onClick={handleCycleReset}>
            <RestartCycleIcon /> restart cycle
          </button>
        )}
      </div>
    </div>
  );
}

export default Timer;
