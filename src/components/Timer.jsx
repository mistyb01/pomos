import { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider";

import dayjs from "dayjs";

import useSound from "use-sound";
import WorkFanfare from "../sounds/work_timer_fanfare.wav";
import BreakEndSfx from "../sounds/break_end.mp3";
import FinishMessage from "./FinishMessage";
import TimerButtonGroup from "./TimerButtonGroup";
import RestartCycleIcon from "./icons/RestartCycleIcon";

function Timer({
  cycle,
  soundOn,
  remainingTime,
  handleSetRemainingTime,
  cycleIndex,
  handleSetCycleIndex,
}) {
  const { auth, user, insertSession } = useAuth();

  const [playWorkFanfare] = useSound(WorkFanfare, {
    volume: 1,
  });
  const [playBreakEnd] = useSound(BreakEndSfx, { volume: 1 });

  const [timerActive, setTimerActive] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(null);

  const initialTime = cycle[cycleIndex];

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

        handleSetRemainingTime({
          minutes: remainingTimeMins,
          seconds: remainingTimeSecs,
        });

        if (remainingTimeMins < 0 && remainingTimeSecs < 1) {
          if (soundOn && initialTime.mode === "work") {
            playWorkFanfare();
          } else if (soundOn && initialTime.mode === "break") {
            playBreakEnd();
          }
          setTimerActive(false);
          showNotification();

          // if logged in
          if (auth && initialTime.mode === "work") {
            console.log("logged in user finished timer!");
            insertTimerData();
          }

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
    handleSetRemainingTime(cycle[cycleIndex]);
  }

  function handleTimerNext() {
    setTimerStartTime(dayjs());
    handleSetCycleIndex((c) => c + 1);
    handleSetRemainingTime(null);
  }

  function handleCycleReset() {
    handleSetCycleIndex(0);
    handleSetRemainingTime(null);
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

  const insertTimerData = async () => {
    try {
      const finishTime = dayjs();
      const { error } = await insertSession({
        createdAt: finishTime,
        timerLength: initialTime.minutes,
        userId: user.id,
      });
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("oh no error:", error);
    }
  };

  return (
    <>
      {!isCycleComplete && (
        <div className="timer-and-buttons-container">
          <div className="cycle-heading text-accent">
            <h2>{initialTime.mode}.</h2>
            <div className="progress-circle-container">
              {cycle.map((session, i) => {
                if (i <= cycleIndex) {
                  return (
                    <span
                      key={i}
                      className={`progress-circle progress-circle-${session.mode} background-current-complete`}
                    ></span>
                  );
                }
                return (
                  <span
                    key={i}
                    className={`progress-circle progress-circle-${session.mode} background-incomplete`}
                  ></span>
                );
              })}
            </div>
          </div>

          <div className="timer-container text-main">
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
          <div className="option-container">
            {cycleIndex !== 0 && (
              <button
                className="option-button text-light"
                onClick={handleCycleReset}
              >
                <RestartCycleIcon /> restart cycle
              </button>
            )}
          </div>
        </div>
      )}

      {isCycleComplete && (
        <FinishMessage cycle={cycle} resetCycle={handleCycleReset} />
      )}
    </>
  );
}

export default Timer;
