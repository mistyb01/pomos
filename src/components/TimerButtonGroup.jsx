import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import ForwardIcon from "./icons/ForwardIcon";
import ReplayIcon from "./icons/ReplayIcon";

export default function TimerButtonGroup({
  resetTimer,
  startTimer,
  nextTimer,
  timerActive,
  hasNextSession,
}) {
  return (
    <div className="timer-button-container">
      <button className="timer-button timer-button__reset" onClick={resetTimer}>
        <ReplayIcon />
      </button>

      <button className="timer-button timer-button__play" onClick={startTimer}>
        {timerActive ? <PauseIcon /> : <PlayIcon />}
      </button>

      <button
        className={
          hasNextSession
            ? "timer-button timer-button__skip"
            : "timer-button timer-button__skip timer-button__disabled"
        }
        onClick={hasNextSession ? nextTimer : undefined}
      >
        <ForwardIcon />
      </button>
    </div>
  );
}
