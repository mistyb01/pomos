import { useState, useEffect } from "react";
import dayjs from "dayjs";

import useSound from "use-sound";
import WorkFanfare from "./sounds/work_timer_fanfare.wav";
import BreakEndSfx from "./sounds/break_end.mp3";
import FinishMessage from "./components/FinishMessage";
import TimerButtonGroup from "./components/TimerButtonGroup";
import OptionButtonGroup from "./components/OptionButtonGroup";

function Timer({ cycle }) {
  const [playWorkFanfare] = useSound(WorkFanfare, {
    volume: 1,
  });
  const [playBreakEnd] = useSound(BreakEndSfx, { volume: 1 });

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
          showNotification();

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

  function showNotification() {
    const finishTime = dayjs().format("h:mma");
    var options = {
      body: `finished at ${finishTime}.`,
      dir: "ltr",
      icon: "/assets/character_mezamashidokei.png",
      requireInteraction: true,
      silent: true,
    };

    new Notification(`${initialTime.mode} timer done!`, options);
  }

  return (
    <>
      {!isCycleComplete && (
        <div className="timer-and-buttons-container">
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
          <OptionButtonGroup
            soundOn={soundOn}
            updateSound={() => setSoundOn(!soundOn)}
            cycleIndex={cycleIndex}
            resetCycle={handleCycleReset}
          />
        </div>
      )}

      {isCycleComplete && (
        <FinishMessage cycle={cycle} resetCycle={handleCycleReset} />
      )}
    </>
  );
}

export default Timer;
