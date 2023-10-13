import { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider";

// library for time-related functions
import dayjs from "dayjs";

// components
import FinishMessage from "./FinishMessage";
import TimerButtonGroup from "./TimerButtonGroup";
import RestartCycleIcon from "./icons/RestartCycleIcon";

// for sound effects
import useSound from "use-sound";
import WorkFanfare from "../sounds/work_timer_fanfare.wav";
import BreakEndSfx from "../sounds/break_end.mp3";

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

  // captures when the timer is started, to use when calculating the remaining time.
  const [timerStartTime, setTimerStartTime] = useState(null);

  // the starting time for each timer (i.e. what the timer resets to.)
  const initialTime = cycle[cycleIndex];

  const [isCycleComplete, setIsCycleComplete] = useState(false);
  const hasNextSession = cycleIndex + 1 < cycle.length;

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let id;
    let remainingTimeMins;
    let remainingTimeSecs;

    if (timerActive) {
      id = setInterval(() => {
        let remainingInSecs = timerTick();

        // convert the above value into minutes and second values.
        remainingTimeSecs = remainingInSecs % 60;
        remainingTimeMins = Math.floor(remainingInSecs / 60);

        handleSetRemainingTime({
          minutes: remainingTimeMins,
          seconds: remainingTimeSecs,
        });

        // when timer reaches 0:00
        if (remainingTimeMins < 0 && remainingTimeSecs < 1) {
          //  play a sound effect if applicable
          checkToPlaySound();
          // then indicate that the timer is no longer active, to halt setInterval().
          // and show notif.
          setTimerActive(false);
          showNotification();

          // if logged in, insert session data to supabase
          if (auth && initialTime.mode === "work") insertTimerData();

          // continue to next timer if there's another one left in the cycle
          if (cycleIndex + 1 < cycle.length) {
            handleTimerNext();
          } else {
            // indicate that reached end of cycle
            setIsCycleComplete(true);
          }
        }
      }, 1000);

      // clean up
      return () => {
        clearInterval(id);
      };
    }
  }, [timerStartTime]);

  // function for just the timer tick logic
  function timerTick() {
    let currentTime = dayjs();

    // the diffInSecs value represents how many seconds between the current time,
    // and when the start button was last pressed.
    let diffInSecs = currentTime.diff(timerStartTime, "seconds");

    // initialInSecs represents the 'current state' of the timer, in seconds.
    let initialInSecs;
    if (!remainingTime) {
      initialInSecs = initialTime.minutes * 60 + initialTime.seconds;
    } else {
      initialInSecs = remainingTime.minutes * 60 + remainingTime.seconds;
    }

    // calculate the value (in secs) that will appear on the timer.
    let remainingInSecs = initialInSecs - diffInSecs;
    return remainingInSecs;
  }

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

  function checkToPlaySound() {
    if (soundOn && initialTime.mode === "work") {
      playWorkFanfare();
    } else if (soundOn && initialTime.mode === "break") {
      playBreakEnd();
    }
  }

  function showNotification() {
    const finishTime = dayjs().format("h:mma");
    var options = {
      body: `finished at ${finishTime}.`,
      dir: "ltr",
      icon: "../../public/assets/character_mezamashidokei.png",
      requireInteraction: true,
      silent: true,
    };
    new Notification(`${initialTime.mode} timer done!`, options);
  }

  const insertTimerData = async () => {
    try {
      setErrorMsg("");
      const finishTime = dayjs();
      const { error } = await insertSession({
        createdAt: finishTime,
        timerLength: initialTime.minutes,
        userId: user.id,
      });
      if (error) {
        setErrorMessage(error);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {errorMessage && <p className="text-body">error: {errorMessage}</p>}
      {!isCycleComplete && (
        <div className="timer-and-buttons-container">
          <div className="cycle-heading text-accent">
            <h2>
              {initialTime.mode === "longBreak"
                ? "long break"
                : initialTime.mode}
              .
            </h2>
            {/* render the progress-indicator circles */}
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
